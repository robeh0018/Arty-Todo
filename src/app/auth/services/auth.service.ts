import {effect, inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {FirestoreUsersService, User} from "../../users";
import {FirebaseAuthService} from "./firebase-auth.service";
import {SnackBarService} from "../../services";
import {AuthErrorMessageComponent} from "../components";
import type {AuthUserRegistrationPayload} from "../models";
import {AuthStoreService} from "./auth-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private firebaseAuthService = inject(FirebaseAuthService);
  private firestoreUsersService = inject(FirestoreUsersService);
  private snackBarService = inject(SnackBarService);
  private authStoreService = inject(AuthStoreService);


  constructor() {
    this.authRedirectEffect();
    this.authShowErrorEffect();
  }

  public async authSignUpWithEmailAndPassword(authUserRegistrationPayload: AuthUserRegistrationPayload): Promise<void> {

    const {email, password, userName, fullName} = authUserRegistrationPayload;

    // Create the user on firebase authentication.
    const {success, payload, error} = await this.firebaseAuthService.onCreateUserWithEmailAndPassword(email, password);

    // Error on authentication.
    if (!success && error) return this.handleFailedAuthentication(error);

    // Authentication success.
    if (success && payload) {

      const newUser: User = {
        ...payload,
        userName: payload.userName ? payload.userName : userName,
        fullName,
        email,
        role: 'user',
      };

      // Save the user data in a firestore doc.
      await this.firestoreUsersService.addUser(newUser);

      this.handleSuccessAuthentication(newUser);
      return;
    }
  }

  public async authSignInWithEmailAndPassword(email: string, password: string) {

    const {success, payload, error} = await this.firebaseAuthService.onSignInWithEmailAndPassword(email, password);

    // Error on authentication.
    if (!success && error) return this.handleFailedAuthentication(error);

    // Authentication success.
    if (success && payload) {

      // Load and set user from firestore.
      const userData = await this.firestoreUsersService.getUserById(payload.uid);

      if (userData) {
        this.handleSuccessAuthentication(userData);
      }
    }
  }

  public async authAuthenticateWithGoogle() {
    const {success, payload, error} = await this.firebaseAuthService.onAuthWithGoogle();

    // Error on authentication.
    if (!success && error) return this.handleFailedAuthentication(error);

    // Authentication success.
    if (success && payload) {

      // Check if user exist.
      const userData = await this.firestoreUsersService.getUserById(payload.uid);

      // This is because if the email is @gmail.com google is the trustiest provider and firebase overwrite before
      // authentications with others providers.
      const isADifferentProvider = !!userData?.providers.find(provider => provider !== 'google.com');

      if (!userData || isADifferentProvider) {
        //   Sign up.
        const newUser: User = {
          ...payload,
          fullName: null,
          role: 'user',
        };

        // Save the user data in a firestore doc.
        await this.firestoreUsersService.addUser(newUser);

        this.handleSuccessAuthentication(newUser);
      } else {
        //  Sign in

        this.handleSuccessAuthentication(userData);
      }
    }
  }

  public async authAuthenticateWithGithub() {
    const {success, payload, error} = await this.firebaseAuthService.onAuthWithGithub();

    // Error on authentication.
    if (!success && error) return this.handleFailedAuthentication(error);

    // Authentication success.
    if (success && payload) {

      // Check if user exist.
      const userData = await this.firestoreUsersService.getUserById(payload.uid);

      if (!userData) {
        //   Sign up.
        const newUser: User = {
          ...payload,
          fullName: null,
          role: 'user',
        };

        // Save the user data in a firestore doc.
        await this.firestoreUsersService.addUser(newUser);

        this.handleSuccessAuthentication(newUser);
      } else {
        //  Sign in

        this.handleSuccessAuthentication(userData);
      }
    }
  }

  public async authAuthenticateWithFacebook() {
    const {success, payload, error} = await this.firebaseAuthService.onAuthWithFacebook();

    // Error on authentication.
    if (!success && error) return this.handleFailedAuthentication(error);

    // Authentication success.
    if (success && payload) {

      // Check if user exist.
      const userData = await this.firestoreUsersService.getUserById(payload.uid);

      if (!userData) {
        //   Sign up.
        const newUser: User = {
          ...payload,
          fullName: null,
          role: 'user',
        };

        // Save the user data in a firestore doc.
        await this.firestoreUsersService.addUser(newUser);

        this.handleSuccessAuthentication(newUser);
      } else {
        //  Sign in

        this.handleSuccessAuthentication(userData);
      }
    }
  }

  public async authSendPasswordResetEmail(email: string) {

    const {success, payload, error} = await this.firebaseAuthService.onSendPasswordResetEmail(email);

    if (!success && error) return this.handleFailedAuthentication(error);

    if (success && payload) this.snackBarService.showSuccessSnackBar(payload);
  }

  public async authSignOut() {
    await this.firebaseAuthService.onSignOut();

    this.authStoreService.setLoggedUser(null);

    await this.router.navigate(['/auth']);
  }

  public async authUpdateUserPassword(newPassword: string) {

    const {success, payload, error} = await this.firebaseAuthService.onUpdateUserPassword(newPassword);

    if (!success && error) return this.handleFailedAuthentication(error);

    if (success && payload) this.snackBarService.showSuccessSnackBar(payload);

    await this.router.navigate(['/todos']);
  }

  private handleSuccessAuthentication(userData: User) {
    this.authStoreService.setAuthError(null);
    this.authStoreService.setLoggedUser(userData);
  }

  private handleFailedAuthentication(errorMessage: string) {
    this.authStoreService.setLoggedUser(null);
    this.authStoreService.setAuthError(errorMessage)
  }

  // When logged user is defined navigate to /todos.
  private authRedirectEffect() {
    effect(() => {
      if (this.authStoreService.getLoggedUser()() !== null) {
        this.router.navigate(['/todos']).then();
      }
    })
  }

  // When an auth error happens show snackBar error;
  private authShowErrorEffect() {
    effect(() => {
      if (this.authStoreService.getAuthError()() !== null) {
        this.snackBarService.showSnackBarFromComponent(AuthErrorMessageComponent);
      }
    })

  }
}

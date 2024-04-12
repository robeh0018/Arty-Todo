import {effect, inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {FirestoreUsersService, User} from "../../users";
import {FirebaseAuthService} from "./firebase-auth.service";
import {SnackBarService} from "../../services";
import {AuthErrorMessageComponent} from "../components";
import type {AuthUserRegistrationPayload, FirebaseAuthUser} from "../models";
import {AuthStoreService} from "./auth-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private firebaseAuthService = inject(FirebaseAuthService);
  private firestoreUsersService = inject(FirestoreUsersService);
  private authStoreService = inject(AuthStoreService);
  private snackBarService = inject(SnackBarService);


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

  public async authSignInWithEmailAndPassword(email: string, password: string): Promise<void> {

    const {success, payload, error} = await this.firebaseAuthService.onSignInWithEmailAndPassword(email, password);

    // Error on authentication.
    if (!success && error) return this.handleFailedAuthentication(error);

    // Authentication success.
    if (success && payload) {

      const userData = await this.handleUserData(payload);

      if (userData) {
        this.handleSuccessAuthentication(userData);
      }
    }
  }

  public async authAuthenticateWithGoogle(): Promise<void> {
    const {success, payload, error} = await this.firebaseAuthService.onAuthWithGoogle();

    // Error on authentication.
    if (!success && error) return this.handleFailedAuthentication(error);

    // Authentication success.
    if (success && payload) {

      // Check if user exist.
      const userData = await this.handleUserData(payload);

      // This is because if the email is @gmail.com google is the trustiest provider and firebase overwrite before
      // authentications with others providers.
      const isADifferentProvider = !!userData?.providers.find(provider => provider !== 'google.com');

      if (!userData || isADifferentProvider) {
        console.log('sign up')
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
        console.log('sign in')


        this.handleSuccessAuthentication(userData);
      }
    }
  }

  public async authAuthenticateWithGithub(): Promise<void> {
    const {success, payload, error} = await this.firebaseAuthService.onAuthWithGithub();

    // Error on authentication.
    if (!success && error) return this.handleFailedAuthentication(error);

    // Authentication success.
    if (success && payload) {

      // Check if user exist.
      const userData = await this.handleUserData(payload);

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

  public async authAuthenticateWithFacebook(): Promise<void> {
    const {success, payload, error} = await this.firebaseAuthService.onAuthWithFacebook();

    // Error on authentication.
    if (!success && error) return this.handleFailedAuthentication(error);

    // Authentication success.
    if (success && payload) {

      // Check if user exist.
      const userData = await this.handleUserData(payload);

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

  public async authSendPasswordResetEmail(email: string): Promise<void> {

    const {success, payload, error} = await this.firebaseAuthService.onSendPasswordResetEmail(email);

    if (!success && error) return this.handleFailedAuthentication(error);

    if (success && payload) this.snackBarService.showSuccessSnackBar(payload);
  }

  public async authSendEmailVerification(): Promise<void> {
    const {success, payload, error} = await this.firebaseAuthService.onSendEmailVerification();

    if (!success && error) return this.handleFailedAuthentication(error);

    if (success && payload) return this.snackBarService.showSuccessSnackBar(payload);
  }

  public async authUpdateUserPassword(newPassword: string): Promise<void> {

    const {success, payload, error} = await this.firebaseAuthService.onUpdateUserPassword(newPassword);

    if (!success && error) return this.handleFailedAuthentication(error);

    if (success && payload) this.snackBarService.showSuccessSnackBar(payload);
  }

  public async authSignOut(): Promise<void> {
    await this.firebaseAuthService.onSignOut();

    this.authStoreService.setCurrentUser(null);

    await this.router.navigate(['/auth']);
  }

  public async reauthenticateUserIfIsPossible(): Promise<User | undefined> {
    // Check user es authenticated in firebase.
    const firebaseUserAuthenticated = this.firebaseAuthService.getFirebaseUserAuthenticated();

    if (!firebaseUserAuthenticated) return undefined;

    const userData = await this.firestoreUsersService.getUserById(firebaseUserAuthenticated.uid);

    if (userData) {
      this.authStoreService.setCurrentUser(userData);

      this.snackBarService.showSuccessSnackBar(`${userData.userName} has benn re-authenticated`)

      return userData;
    }

    return undefined;
  }

  private async handleUserData(payload: FirebaseAuthUser): Promise<User | undefined> {
    // Update fields which can get changes.
    const {uid, providers, emailVerified, lastSignInTime, phoneNumber} = payload;

    const userExist = await this.firestoreUsersService.getUserById(payload.uid);


    if (!userExist) return undefined;

    await this.firestoreUsersService.updateUserCanChangeFieldsOnAuth(uid, {
      lastSignInTime,
      emailVerified,
      providers,
      phoneNumber
    });

    // Load and set user from firestore.
    return await this.firestoreUsersService.getUserById(payload.uid);
  }

  private handleSuccessAuthentication(userData: User): void {
    this.authStoreService.setAuthError(null);
    this.authStoreService.setCurrentUser(userData);
  }

  private handleFailedAuthentication(errorMessage: string): void {
    this.authStoreService.setCurrentUser(null);
    this.authStoreService.setAuthError(errorMessage)
  }

  // When logged user is defined navigate to /todos.
  private authRedirectEffect(): void {
    effect(() => {
      if (this.authStoreService.getCurrentUser()() !== null) {

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

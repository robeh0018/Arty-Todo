import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {FirestoreUsersService, User} from "../../users";
import {FirebaseAuthService} from "./firebase-auth.service";
import {SnackBarService} from "../../services";
import {AuthErrorMessageComponent} from "../components";
import type {AuthUserRegistrationPayload} from "../models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private firebaseAuthService = inject(FirebaseAuthService);
  private firestoreUsersService = inject(FirestoreUsersService);
  private snackBarService = inject(SnackBarService);
  private loggedUser: WritableSignal<User | null> = signal<User | null>(null);
  private authError: WritableSignal<string | null> = signal<string | null>(null);

  constructor() {
    this.authRedirectEffect();
    this.authShowErrorEffect();
  }

  // Get user authenticated.
  public getLoggedUser(): WritableSignal<User | null> {
    return this.loggedUser;
  };

  // Get auth error.
  public getAuthError(): WritableSignal<string | null> {
    return this.authError;
  };

  //  Set Auth error.
  public setAuthError(errorMessage: string | null): void {

    this.authError.set(errorMessage);

    // localStorage.setItem('authError', JSON.stringify(errorMessage));
  }

  //  Set User authenticated.
  public setLoggedUser(user: User | null): void {

    this.loggedUser.set(user);

    // localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  // Sign up with email and password.
  public async signUpWithEmailAndPassword(authUserRegistrationPayload: AuthUserRegistrationPayload): Promise<void> {

    const {email, password, userName, fullName} = authUserRegistrationPayload;

    // Create the user un firebase authentication.
    const {success, payload, error} = await this.firebaseAuthService.onCreateUserWithEmailAndPassword(email, password);

    //  Error on firebase auth
    if (!success && error) {
      this.setLoggedUser(null);
      this.setAuthError(error)
      return;
    }

    if (success && payload) {

      // Add User data to firestore.
      const newUser: User = {
        ...payload,
        userName,
        fullName,
        email,
        role: 'user',
      };

      // Save the user data in a firestore doc.
      await this.firestoreUsersService.addUser(newUser);

      // User is successfully logged
      this.setAuthError(null);
      this.setLoggedUser(newUser);
      return;
    }
  }

  //  Sign in with email and password.
  public async loginWithEmailAndPassword(email: string, password: string) {

    const {success, payload, error} = await this.firebaseAuthService.onSignInWithEmailAndPassword(email, password);

    // Error on firebase auth.
    if (!success && error) {
      this.setLoggedUser(null);
      this.setAuthError(error)
      return;
    }

    // Load and set user from firestore.
    if (success && payload) {

      const userData = await this.firestoreUsersService.loadUserData(payload.uid);

      if (userData) {
        // User is successfully logged
        this.setAuthError(null);
        this.setLoggedUser(userData);
      }
    }
  }

  public async signUp() {
    await this.firebaseAuthService.onSignOut();

    this.setLoggedUser(null);

    await this.router.navigate(['/auth']);
  }


  // When logged user is defined navigate to /todos.
  private authRedirectEffect() {
    effect(() => {
      if (this.getLoggedUser()() !== null) {
        this.router.navigate(['/todos']).then();
      }
    })
  }

  // When an auth error happens show snackBar error;
  private authShowErrorEffect() {
    effect(() => {
      if (this.getAuthError()() !== null) {
        this.snackBarService.showSnackBarFromComponent(AuthErrorMessageComponent);
      }
    })

  }
}

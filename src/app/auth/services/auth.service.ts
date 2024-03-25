import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {FirebaseAuthService} from "./firebase-auth.service";
import {FirestoreUsersService} from "./firestore-users.service";
import type {LoggedUser, UserRegistrationPayload} from "../models";
import {Router} from "@angular/router";
import {SnackBarService} from "../../services";
import {AuthErrorMessageComponent} from "../components";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private firebaseAuthService = inject(FirebaseAuthService);
  private firestoreUsersService = inject(FirestoreUsersService);
  private snackBarService = inject(SnackBarService);
  private loggedUser: WritableSignal<LoggedUser | undefined> = signal<LoggedUser | undefined>(undefined);
  private authError: WritableSignal<string | undefined> = signal<string | undefined>(undefined);

  constructor() {
    this.authRedirectEffect();
    this.authShowErrorEffect();
  }

  // Sign up with email and password.
  public async signUpWithEmailAndPassword(userRegistrationPayload: UserRegistrationPayload): Promise<void> {

    const {email, password, userName, fullName} = userRegistrationPayload;

    // Create the user un firebase authentication.
    const {success, payload} = await this.firebaseAuthService.onCreateUserWithEmailAndPassword(email, password);

    //  Error on firebase auth
    if (!success) {
      this.setAuthError(payload)
      return;
    }

    // Logged user data.
    const loggedUserData: LoggedUser = {
      uid: payload,
      userName,
      fullName,
      email
    };

    // Save the user data in a firestore doc.
    await this.firestoreUsersService.addUser(loggedUserData);

    // User is successfully logged
    // Set auth error to undefined.
    this.setAuthError(undefined);
    // Set user as logged user;
    this.setLoggedUser(loggedUserData);
  }

  //  Sign in with email and password.
  public async loginWithEmailAndPassword(email: string, password: string) {

    const {success, payload} = await this.firebaseAuthService.onSignInWithEmailAndPassword(email, password);


    // Error on firebase auth.
    if (!success) {
      this.setAuthError(payload);
      return
    }

    const loggedUserData = await this.firestoreUsersService.loadUserData(payload);

    // Error on firestore.
    if (!loggedUserData) return;

    // User is successfully logged
    // Set auth error to undefined.
    this.setAuthError(undefined);
    // Set user as logged user;
    this.setLoggedUser(loggedUserData);
  }

  // Get user authenticated.
  public getLoggedUser(): WritableSignal<LoggedUser | undefined> {
    return this.loggedUser;
  };

  // Get auth error.
  public getAuthError(): WritableSignal<string | undefined> {
    return this.authError;
  };

  //  Set Auth error.
  public setAuthError(errorMessage: string | undefined): void {

    this.authError.set(errorMessage);

    localStorage.setItem('authError', JSON.stringify(errorMessage));
  }

  //  Set User authenticated.
  public setLoggedUser(loggedUserData: LoggedUser): void {

    this.loggedUser.set(loggedUserData);

    localStorage.setItem('loggedUser', JSON.stringify(loggedUserData));
  }

  // When logged user is defined navigate to /todos.
  private authRedirectEffect() {
    effect(() => {
      if (this.getLoggedUser()() !== undefined) {
        this.router.navigate(['/todos']).then();
      }
    })
  }

  // When an auth error happens show snackBar error;
  private authShowErrorEffect() {
    effect(() => {
      if (this.getAuthError()() !== undefined) {
        this.snackBarService.showSnackBarFromComponent(AuthErrorMessageComponent);
      }
    })

  }
}

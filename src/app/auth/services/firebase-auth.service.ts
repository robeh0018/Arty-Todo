import {inject, Injectable} from '@angular/core';
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  User,
  UserInfo
} from "firebase/auth";
import {FirebaseAuth} from "../../firebase.config";
import {FirebaseAuthResponse, handlingFirebaseAuthErrors} from "../helpers";
import {FirebaseAuthUser} from "../models";
import {FirestoreUsersService} from "../../users";

@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {

  private firestoreUsersService = inject(FirestoreUsersService);

  public async onCreateUserWithEmailAndPassword(email: string, password: string): Promise<{
    success: boolean,
    payload: FirebaseAuthUser | null,
    error: string | null
  }> {

    try {

      // Authenticate the user.
      const {user} = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

      // Map User credentials to FirebaseAuthUser
      const firebaseAuthUserData = await this.mapUserData(user);

      return FirebaseAuthResponse.successWithUserAsPayload(firebaseAuthUserData);

    } catch (e: any) {

      console.log(`Error on signUn with email and password ${e.code}`);

      return FirebaseAuthResponse.fail(handlingFirebaseAuthErrors(e.code))
    }
  };

  public async onSignInWithEmailAndPassword(email: string, password: string): Promise<{
    success: boolean,
    payload: FirebaseAuthUser | null,
    error: string | null
  }> {
    try {
      const {user} = await signInWithEmailAndPassword(FirebaseAuth, email, password);

      // Map User credentials to FirebaseAuthUser
      const firebaseAuthUserData = await this.mapUserData(user);

      return FirebaseAuthResponse.successWithUserAsPayload(firebaseAuthUserData);
    } catch (e: any) {

      console.log(`Error on signIn with email and password ${e.code}`);

      return FirebaseAuthResponse.fail(handlingFirebaseAuthErrors(e.code))
    }
  };

  public async onSignOut(): Promise<void> {
    try {

      await signOut(FirebaseAuth);
    } catch (e) {

      console.log(`Error on signOut ${e}`);
    }
  }

  public async onAuthWithGoogle(): Promise<{
    success: boolean,
    payload: FirebaseAuthUser | null,
    error: string | null
  }> {
    const googleAuthProvider = new GoogleAuthProvider();

    try {
      const {user} = await signInWithPopup(FirebaseAuth, googleAuthProvider);

      // Map User credentials to FirebaseAuthUser
      const firebaseAuthUserData = await this.mapUserData(user);

      return FirebaseAuthResponse.successWithUserAsPayload(firebaseAuthUserData);

    } catch (e: any) {

      console.log(`Error on auth with Google ${e.code}`);
      return FirebaseAuthResponse.fail(handlingFirebaseAuthErrors(e.code))
    }
  }

  public async onAuthWithGithub(): Promise<{
    success: boolean,
    payload: FirebaseAuthUser | null,
    error: string | null
  }> {
    const githubProvider = new GithubAuthProvider();

    try {

      const {user} = await signInWithPopup(FirebaseAuth, githubProvider);

      // Map User credentials to FirebaseAuthUser
      const firebaseAuthUserData = await this.mapUserData(user);

      return FirebaseAuthResponse.successWithUserAsPayload(firebaseAuthUserData);

    } catch (e: any) {

      console.log(`Error on auth with Github ${e.code}`);
      return FirebaseAuthResponse.fail(handlingFirebaseAuthErrors(e.code))
    }
  };

  public async onAuthWithFacebook(): Promise<{
    success: boolean,
    payload: FirebaseAuthUser | null,
    error: string | null
  }> {
    try {
      const facebookProvider = new FacebookAuthProvider();

      const {user} = await signInWithPopup(FirebaseAuth, facebookProvider);

      // Map User credentials to FirebaseAuthUser
      const firebaseAuthUserData = await this.mapUserData(user);

      return FirebaseAuthResponse.successWithUserAsPayload(firebaseAuthUserData);
    } catch (e: any) {

      console.log(`Error on auth with Facebook ${e.code}`);
      return FirebaseAuthResponse.fail(handlingFirebaseAuthErrors(e.code))
    }
  }

  public async onSendPasswordResetEmail(email: string): Promise<{
    success: boolean,
    payload: string | null,
    error: string | null
  }> {
    try {
      await sendPasswordResetEmail(FirebaseAuth, email);

      return FirebaseAuthResponse.successWithMessageAsPayload('Reset password email have been sent');
    } catch (e: any) {

      console.log(`Error on send Password Reset email ${e.code}`);
      return FirebaseAuthResponse.fail(e.code);
    }
  }

  public async onSendEmailVerification(): Promise<{
    success: boolean,
    payload: string | null,
    error: string | null
  }> {
    try {
      const firebaseCurrentUser = FirebaseAuth.currentUser;

      if (!firebaseCurrentUser) return FirebaseAuthResponse.fail('Your session expires have to resign in, email verification');

      await sendEmailVerification(firebaseCurrentUser);

      return FirebaseAuthResponse.successWithMessageAsPayload(`Verification email was sent to ${firebaseCurrentUser.email}`);
    } catch (e: any) {

      console.log(`Error on send Email verification ${e.code}`);
      return FirebaseAuthResponse.fail(e.code);
    }

  }

  public async onUpdateUserPassword(newPassword: string): Promise<{
    success: boolean,
    payload: string | null,
    error: string | null
  }> {
    try {
      const currentUser = FirebaseAuth.currentUser;

      if (currentUser) {
        await updatePassword(currentUser, newPassword);

        return FirebaseAuthResponse.successWithMessageAsPayload('Your password have been updated');
      }

      return FirebaseAuthResponse.successWithMessageAsPayload('You are not signing in for a long time');
    } catch (e: any) {

      console.log(`Error on Update user Password email ${e.code}`);
      return FirebaseAuthResponse.fail(e.code);
    }
  };

  public getFirebaseUserAuthenticated() {
    return FirebaseAuth.currentUser;
  }

  private getProviders(providerData: UserInfo[]): string[] {
    return providerData.map(data => data.providerId);
  }

  private async mapUserData(userCredential: User) {
    const {metadata, uid, phoneNumber, providerData, emailVerified, photoURL, displayName, email} = userCredential;

    // Check is userName is already in used;
    const userOnDb = await this.firestoreUsersService.getUserById(uid);
    const userName = userOnDb ? userOnDb.userName : displayName;

    return {
      uid,
      photoURL,
      email,
      emailVerified,
      phoneNumber,
      userName,
      providers: this.getProviders(providerData),
      creationTime: metadata.creationTime,
      lastSignInTime: metadata.lastSignInTime,
    } as FirebaseAuthUser;
  };
}


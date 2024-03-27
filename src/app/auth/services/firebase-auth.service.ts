import {Injectable} from '@angular/core';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {FirebaseAuth} from "../../firebase.config";
import {FirebaseAuthResponse, handlingFirebaseAuthErrors} from "../helpers";
import {FirebaseAuthUser} from "../models";

@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {

  public async onCreateUserWithEmailAndPassword(email: string, password: string) {

    try {

      // Authenticate the user.
      const {user} = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

      const {metadata, uid, phoneNumber, emailVerified, photoURL} = user;

      const firebaseAuthUserData: FirebaseAuthUser = {
        uid,
        photoURL,
        emailVerified,
        phoneNumber,
        creationTime: metadata.creationTime,
        lastSignInTime: metadata.lastSignInTime,
      }

      return FirebaseAuthResponse.success(firebaseAuthUserData);

    } catch (e: any) {

      console.log(e?.code)

      return FirebaseAuthResponse.fail(handlingFirebaseAuthErrors(e.code))
    }
  }


  public async onSignInWithEmailAndPassword(email: string, password: string) {
    try {
      const {user} = await signInWithEmailAndPassword(FirebaseAuth, email, password);

      const {metadata, uid, phoneNumber, emailVerified, photoURL} = user;

      const firebaseAuthUserData: FirebaseAuthUser = {
        uid,
        photoURL,
        emailVerified,
        phoneNumber,
        creationTime: metadata.creationTime,
        lastSignInTime: metadata.lastSignInTime,
      }

      return FirebaseAuthResponse.success(firebaseAuthUserData);

    } catch (e: any) {

      console.log({msg: e.code});

      return FirebaseAuthResponse.fail(handlingFirebaseAuthErrors(e.code))
    }
  };

  public async onSignOut(): Promise<void> {
    try {

      await signOut(FirebaseAuth);
    } catch (e) {

      console.log({e});
    }
  }

}

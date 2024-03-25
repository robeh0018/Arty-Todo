import {Injectable} from '@angular/core';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {FirebaseAuth} from "../../firebase.config";
import {handlingFirebaseAuthErrors} from "../helpers";

@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {

  public async onCreateUserWithEmailAndPassword(email: string, password: string) {

    try {

      // Authenticate the user.
      const userCredentials = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

      return {
        success: true,
        payload: userCredentials.user.uid
      };

    } catch (e: any) {
      console.log(e.message)
      console.log(e.code)

      return {
        success: false,
        payload: handlingFirebaseAuthErrors(e.code)
      };
    }
  }


  public async onSignInWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredentials = await signInWithEmailAndPassword(FirebaseAuth, email, password);

      return {
        success: true,
        payload: userCredentials.user.uid
      };
    } catch (e: any) {

      console.log({msg: e.code});

      return {
        success: false,
        payload: handlingFirebaseAuthErrors(e.code)
      };
    }
  }

}

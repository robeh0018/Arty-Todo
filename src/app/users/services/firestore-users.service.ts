import {Injectable} from '@angular/core';
import {doc, getDoc, setDoc} from "firebase/firestore";
import {FirebaseDb} from "../../firebase.config";
import {User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class FirestoreUsersService {

  public async addUser(user: User): Promise<void> {
    try {
      const {uid, ...rest} = user;

      const docRef = doc(FirebaseDb, 'users', uid);

      await setDoc(docRef, rest);
    } catch (e) {

      console.log(e);
    }
  }

  public async loadUserData(userId: string): Promise<User | undefined> {

    try {
      const docRef = doc(FirebaseDb, 'users', userId);

      const user = await getDoc(docRef);

      if (!user.exists()) return undefined;

      return {
        uid: userId,
        ...user.data()
      } as User;

    } catch (e) {
      console.log(e);

      return undefined;
    }
  }


}

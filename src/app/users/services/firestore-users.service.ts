import {Injectable} from '@angular/core';
import {collection, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
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

  public async getUserById(userId: string): Promise<User | undefined> {

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

  public async getUsersByEmail(email: string) {

    try {
      let users: User[] = [];

      const q = query(collection(FirebaseDb, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {

        users.push(
          {
            uid: doc.id,
            ...doc.data()
       } as User
        );

      })

      return users;
    } catch (e) {

      console.log(e);

      return [];
    }

  }

}

import {Injectable} from '@angular/core';
import {collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";
import {FirebaseDb} from "../../firebase.config";
import {UpdatePasswordPayload, User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class FirestoreUsersService {


  public async getAllUsers(): Promise<User[]> {
    try {
      const queryConsult = query(collection(FirebaseDb, 'users'))

      const querySnapshot = await getDocs(queryConsult);

      let users: User[] = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        const userResponse = {
          uid: doc.id,
          ...doc.data()
        } as User;

        users.push(userResponse);
      })

      return users;
    } catch (e) {

      console.log(e)
      return [];
    }
  }

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

  public async updateUser(userId: string, payload: UpdatePasswordPayload) {

    const docRef = doc(FirebaseDb, "users", userId);

    await updateDoc(docRef, {...payload});
  }

}

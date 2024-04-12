import {inject, Injectable} from '@angular/core';
import {collection, doc, getDoc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {FirebaseDb} from "../../firebase.config";
import type {User, UserCanChangeOnAuthPayload, UserUpdatePayload} from "../models";
import {SnackBarService} from "../../services";

@Injectable({
  providedIn: 'root'
})
export class FirestoreUsersService {

  private snackBarService: SnackBarService = inject(SnackBarService);

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
      console.log(`Error getting user with id ${userId}`);

      return undefined;
    }
  }

  public async updateUser(userId: string, payload: UserUpdatePayload) {

    try {

      const {userName, fullName, role} = payload;

      // User exist.
      const userExist = await this.getUserById(userId);

      if (!userExist) return;

      const docRef = doc(FirebaseDb, "users", userId);

      await updateDoc(docRef, {userName, fullName, role});

      this.snackBarService.showSuccessSnackBar('User updated');
    } catch (e) {
      console.log(`Error while updating user: ${e}`);

      this.snackBarService.showFailSnackBar('User update');
    }
  }

  public async updateUserCanChangeFieldsOnAuth(userId: string, payload: UserCanChangeOnAuthPayload) {

    try {

      const docRef = doc(FirebaseDb, "users", userId);

      await updateDoc(docRef, {...payload});

    } catch (e) {
      console.log(`Error while updating userCanChangeFieldsOnAuth: ${e}`);
    }
  }
}

import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {User, UserUpdatePayload} from "../models";
import {FirestoreUsersService} from "./firestore-users.service";

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private users: WritableSignal<User[]> = signal<User[]>([]);


  private firestoreUsersService = inject(FirestoreUsersService);

  constructor() {
  }

  public getUsers(): WritableSignal<User[]> {
    return this.users;
  }

  public getUserByEmail(email: string) {
    return this.users().filter(user => user.email === email);
  };

  public async adminLoadUsers(): Promise<void> {
    const usersOnDb = await this.firestoreUsersService.getAllUsers();

    this.users.set(usersOnDb);
  };

  public async adminUpdateUser(userId: string, payload: UserUpdatePayload) {

    await this.firestoreUsersService.updateUser(userId, payload);

    // Change local user data.
    this.users.update(prevUsers => {
      return prevUsers.map(user => {

        if (userId === user.uid) {
          return {
            ...user,
            ...payload
          }
        }

        return user;
      });
    })
  };

}

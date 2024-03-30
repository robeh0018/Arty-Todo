import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {User} from "../../users";

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  private loggedUser: WritableSignal<User | null> = signal<User | null>(null);
  private authError: WritableSignal<string | null> = signal<string | null>(null);

  constructor() {
    // this.syncUserDataWithLocalStorageEffect();
  }

  public getLoggedUser() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser')!) as User | null;
    //
    // if (!currentUser) {
    //   this.setLoggedUser(currentUser);
    // }

    return this.loggedUser.asReadonly();
  }

  public setLoggedUser(user: User | null) {
    this.loggedUser.set(user);
  }

  public getAuthError() {
    return this.authError.asReadonly();
  }

  public setAuthError(errorMessage: string | null) {
    this.authError.set(errorMessage);
  }

  // private syncUserDataWithLocalStorageEffect() {
  //   effect(() => {
  //     localStorage.setItem('currentUser', JSON.stringify(this.getLoggedUser()()));
  //   })
  // }


}

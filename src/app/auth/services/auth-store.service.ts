import {Injectable, signal, WritableSignal} from '@angular/core';
import {User} from "../../users";

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  private loggedUser: WritableSignal<User | null> = signal<User | null>(null);
  private authError: WritableSignal<string | null> = signal<string | null>(null);

  constructor() {
  }

  getLoggedUser() {
    return this.loggedUser.asReadonly();
  }

  setLoggedUser(user: User | null) {
    this.loggedUser.set(user);
  }

  getAuthError() {
    return this.authError.asReadonly();
  }

  setAuthError(errorMessage: string | null) {
    this.authError.set(errorMessage);
  }

}

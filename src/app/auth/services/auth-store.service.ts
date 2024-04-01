import {Injectable, signal, WritableSignal} from '@angular/core';
import {User} from "../../users";

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  private currentUser: WritableSignal<User | null> = signal<User | null>(null);
  private authError: WritableSignal<string | null> = signal<string | null>(null);

  constructor() {
  }

  public getCurrentUser() {
    return this.currentUser.asReadonly();
  }

  public getCurrentUserId() {
    return this.currentUser()?.uid;
  }

  public setCurrentUser(user: User | null) {

    this.currentUser.set(user);
  }

  public getAuthError() {
    return this.authError.asReadonly();
  }

  public setAuthError(errorMessage: string | null) {
    this.authError.set(errorMessage);
  }
}

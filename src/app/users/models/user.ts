import {FirebaseAuthUser} from "../../auth";

export interface User extends FirebaseAuthUser {
  fullName: string | null;
  role: Role;
}

export type Role = 'user' | 'admin';

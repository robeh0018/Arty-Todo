import {FirebaseAuthUser} from "../../auth";

export interface User extends FirebaseAuthUser {
  userName: string;
  fullName: string;
  email: string;
  role: Role;
}

type Role = 'user' | 'admin';

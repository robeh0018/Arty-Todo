import {Role} from "./user";

export interface UserTableData {
  No: number;
  email: string | null;
  userName: string | null;
  fullName: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
  creationTime?: string;
  lastSignInTime?: string;
  providers: string[];
  role: Role;
}

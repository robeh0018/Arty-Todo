import {Role} from "./user";

export interface UserUpdatePayload {
  userName: string | null;
  fullName: string | null;
  role: Role;
}

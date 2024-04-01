export interface UpdatePasswordPayload {
  lastSignInTime?: string;
  phoneNumber: string | null
  emailVerified: boolean;
  providers: string[];
}

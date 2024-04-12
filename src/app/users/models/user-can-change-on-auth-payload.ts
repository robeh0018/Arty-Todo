export interface UserCanChangeOnAuthPayload {
  lastSignInTime?: string;
  phoneNumber: string | null
  emailVerified: boolean;
  providers: string[];
}

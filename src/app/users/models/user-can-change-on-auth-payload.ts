export interface UserCanChangeOnAuthPayload {
  lastSignInTime?: string;
  emailVerified: boolean;
  providers: string[];
}

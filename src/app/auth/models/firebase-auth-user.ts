export interface FirebaseAuthUser {
  uid: string;
  email: string | null;
  userName: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  creationTime?: string;
  lastSignInTime?: string;
  providers: string[];
}

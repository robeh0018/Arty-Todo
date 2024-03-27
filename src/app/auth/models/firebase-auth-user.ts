export interface FirebaseAuthUser {
  uid: string;
  phoneNumber: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  creationTime?: string;
  lastSignInTime?: string;
}

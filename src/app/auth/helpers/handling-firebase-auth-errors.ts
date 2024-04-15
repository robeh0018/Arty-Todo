export const handlingFirebaseAuthErrors = (errorMessage: string) => {

  switch (errorMessage) {
    case 'auth/email-already-exists':
      return 'Email exists'
    case 'auth/email-already-in-use':
      return 'Email in use'
    case 'auth/invalid-credential':
      return 'Invalid credentials'
    case 'auth/too-many-requests':
      return 'Too many attends, try again later'
    case 'auth/invalid-email':
      return 'Invalid credentials'
    case 'auth/account-exists-with-different-credential':
      return "Email exists with different credentials"
    case 'auth/popup-closed-by-user':
      return "Authentication process cancelled"
    case "auth/operation-not-allowed":
      return 'Something went wrong with our provider'

    default:
      return 'Unknown error happened, we are working on it'
  }
}

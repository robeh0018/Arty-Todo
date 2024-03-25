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

    default:
      return 'Unknown error happened'
  }
}

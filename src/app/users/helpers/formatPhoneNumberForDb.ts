export const formatPhoneNumberForDb = (phoneNumber: string | null) => {
  // Replace )(- and white space from phone number.
  return phoneNumber?.replace(/[()\s-]/g, '') ?? null;
}

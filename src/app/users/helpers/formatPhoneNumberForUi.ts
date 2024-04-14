export const formatPhoneNumberForUi = (phoneNumber: string | null) => {

  if (!phoneNumber) return null;
  
  // (111) 111-1111
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

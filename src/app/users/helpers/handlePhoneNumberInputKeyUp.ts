import {FormControl} from "@angular/forms";

export const handlePhoneNumberInputKeyUp = ($event: KeyboardEvent, phoneNumberControl: FormControl<string | null>) => {
  const key = $event.key;

  // Dont do nothing when the key be Space, Backspace, ArrowLeft or ArrowRight.
  if (key === ' ' || key === 'Backspace' || key === 'ArrowLeft' || key === 'ArrowRight') return;

  const phoneNumberValue = phoneNumberControl.value;

  if (phoneNumberValue?.length === 1) phoneNumberControl.patchValue('(' + phoneNumberValue);

  if (phoneNumberValue?.length === 4) phoneNumberControl.patchValue(phoneNumberValue + ') ');

  if (phoneNumberValue?.length === 9) phoneNumberControl.patchValue(phoneNumberValue + '-');
}

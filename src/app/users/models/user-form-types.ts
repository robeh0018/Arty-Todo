import {FormControl} from "@angular/forms";

export interface UserFormTypes {
  email: FormControl<string | null>;
  userName: FormControl<string | null>;
  fullName: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  role: FormControl<string | null>;
}

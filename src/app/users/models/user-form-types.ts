import {FormControl} from "@angular/forms";

export interface UserFormTypes {
  userName: FormControl<string | null>;
  fullName: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  role: FormControl<string | null>;
}

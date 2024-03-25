import {FormControl} from "@angular/forms";

export interface RegisterFormTypes {
  fullName: FormControl<string | null>;
  userName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

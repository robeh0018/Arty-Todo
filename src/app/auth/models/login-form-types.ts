import {FormControl} from "@angular/forms";

export interface LoginFormTypes {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

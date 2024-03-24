import {FormControl} from "@angular/forms";

export interface AddTodoForm {
  title: FormControl<string | null>;
  dueDate: FormControl<string | null>;
}

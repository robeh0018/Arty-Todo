import {FormControl} from "@angular/forms";

export interface SearchTodoForm {
  searchValue: FormControl<string | null>;
}

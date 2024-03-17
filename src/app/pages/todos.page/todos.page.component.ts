import {Component} from '@angular/core';
// Todos components.
import {AddTodoComponent, SearchTodoInputComponent, TodoListComponent} from "../../todos/components";
// Todos services.

@Component({
  standalone: true,
  imports: [
    SearchTodoInputComponent,
    TodoListComponent,
    AddTodoComponent,
  ],
  templateUrl: './todos.page.component.html',
  styles: ``
})
export default class TodosPageComponent {

  constructor() {
  }

}

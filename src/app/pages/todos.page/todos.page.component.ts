import {Component, inject, OnInit} from '@angular/core';
// Todos components.
import {MatProgressSpinner, MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AddTodoComponent, SearchTodoInputComponent, TodoListComponent, TodosService} from "../../todos";

@Component({
  standalone: true,
  imports: [
    SearchTodoInputComponent,
    TodoListComponent,
    AddTodoComponent,

    MatProgressSpinnerModule,
    MatProgressSpinner
  ],
  templateUrl: './todos.page.component.html',
  styles: ``
})
export default class TodosPageComponent implements OnInit {
  public isLoading: boolean = true;
  private todosService = inject(TodosService);

  async ngOnInit() {
    await this.todosService.loadTodosData();
    this.isLoading = false;
  }

}

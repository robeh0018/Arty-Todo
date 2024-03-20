import {Component, inject, OnInit} from '@angular/core';
// Todos components.
import {AddTodoComponent, SearchTodoInputComponent, TodoListComponent} from "../../todos/components";
import {TodosService} from "../../services";
import {MatProgressSpinner, MatProgressSpinnerModule} from "@angular/material/progress-spinner";
// Todos services.

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

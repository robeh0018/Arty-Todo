import {Component, inject, NgZone, OnInit} from '@angular/core';
// Todos components.
import {MatProgressSpinner, MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AddTodoComponent, SearchTodoInputComponent, TodoListComponent} from "../../components";
import {TodosService} from "../../services";
import {AuthStoreService} from "../../../auth";

@Component({
  selector: 'app-todos-page',
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
  private authStoreService = inject(AuthStoreService);
  private zone = inject(NgZone);

  async ngOnInit() {
    const currentUserId = this.authStoreService.getCurrentUserId();

    // This because angular was throwing me an exception maybe a problem in firebase or the time take by the promise.
    await this.zone.runOutsideAngular(async () => {
      await this.todosService.loadTodosData(currentUserId!);
    })
    this.isLoading = false;
  }

}

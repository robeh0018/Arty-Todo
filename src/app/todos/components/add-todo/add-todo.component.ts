import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {take} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
// Shared.
import {DatepickerComponent} from "../../../shared";
// Services.
import {TodosService} from "../../services";
import {AddTodoDialogComponent} from "../../ui";


@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    NgIcon,
    DatepickerComponent,
  ],
  template: `
    <button
      (click)="handleAddTodoDialog()"
      class="flex items-center text-center text-sm bg-transparent p-2 rounded-xl hover:scale-105 on-focus transition-all">

      <ng-icon
        class="m-auto text-xl text-green-500"
        name="bootstrapPlus"/>

      <span class="ms-1 truncate">Add new todo</span>
    </button>
  `,
  styles: ``
})
export class AddTodoComponent {
  private dialog: MatDialog = inject(MatDialog);
  private todosService: TodosService = inject(TodosService);

  handleAddTodoDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(async (result: { title: string, dueDate: Date } | undefined) => {
      if (result === undefined) return;

      await this.todosService.addTodo(result.title, result.dueDate);
    })
  };

}

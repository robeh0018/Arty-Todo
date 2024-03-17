import {Component, inject, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";
import {NgIcon} from "@ng-icons/core";
// Services.
import {TodosService} from "../../../services";
// Ui.
import {DeleteTodoDialogComponent} from "../../ui";

@Component({
  selector: 'app-delete-todo',
  standalone: true,
  imports: [
    NgIcon,
  ],
  template: `
    <button
      (click)="handleDeleteTodoModal()"
      class="rounded-3xl p-1 flex items-center ms-1 focus:outline-none focus:ring-1 focus:ring-red-500 hover:scale-125 transition-all"
      type="button">
      <ng-icon class="text-red-500" name="bootstrapTrash"/>
    </button>
  `,
  styles: ``
})
export class DeleteTodoComponent {
  @Input({required: true}) todoId!: string;

  private todosService = inject(TodosService);
  private dialog: MatDialog = inject(MatDialog);

  handleDeleteTodoModal() {
    const dialogRef = this.dialog.open(DeleteTodoDialogComponent);

    dialogRef.afterClosed().pipe(take(1)).subscribe((result: boolean) => {
      if (result) this.todosService.deleteTodo(this.todoId);
    })
  };
}

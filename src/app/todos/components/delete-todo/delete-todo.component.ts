import {Component, inject, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";
import {NgIcon} from "@ng-icons/core";
// Services.
import {TodosService} from "../../services";
// Shared
import {DeleteDialogComponent} from "../../../shared";

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
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.componentInstance.itemToDeleteName = 'ToDo';

    dialogRef.afterClosed().pipe(take(1)).subscribe(async (result: boolean) => {
      if (result) await this.todosService.deleteTodo(this.todoId);
    })
  };


}

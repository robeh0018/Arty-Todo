import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../../shared";
import {take} from "rxjs";

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [
    NgIcon
  ],
  template: `
    <button
      (click)="handleDeleteUserDialog()"
      class="rounded-3xl p-1 flex items-center ms-1 focus:outline-none focus:ring-1 focus:ring-red-500 hover:scale-125 transition-all"
      type="button">
      <ng-icon class="text-red-500" name="bootstrapTrash"/>
    </button>
  `,
  styles: ``
})
export class UserDeleteComponent {

  private dialog: MatDialog = inject(MatDialog);

  handleDeleteUserDialog() {

    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.componentInstance.itemToDeleteName = 'User';

    dialogRef.afterClosed().pipe(take(1)).subscribe((result: boolean) => {
      console.log(result);
      //   Call user delete.
    });
  }
}

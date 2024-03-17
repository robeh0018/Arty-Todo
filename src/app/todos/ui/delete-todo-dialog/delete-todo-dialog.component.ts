import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {NgIcon, provideIcons} from "@ng-icons/core";
// Bootstrap icons.
import {bootstrapInfoCircle, bootstrapX} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-delete-todo-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    NgIcon,
  ],
  templateUrl: './delete-todo-dialog.component.html',
  styles: ``,
  viewProviders: [
    provideIcons({bootstrapInfoCircle, bootstrapX})
  ]
})
export class DeleteTodoDialogComponent {
  private dialogRef: MatDialogRef<DeleteTodoDialogComponent> = inject(MatDialogRef);

  onCancel() {

    this.dialogRef.close(false);
  };

  onAgreeResults() {

    this.dialogRef.close(true);
  };

}

import {Component, inject, Input} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {NgIcon, provideIcons} from "@ng-icons/core";
// Bootstrap icons.
import {bootstrapInfoCircle, bootstrapX} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    NgIcon,
  ],
  templateUrl: './delete-dialog.component.html',
  styles: ``,
  viewProviders: [
    provideIcons({bootstrapInfoCircle, bootstrapX})
  ]
})
export class DeleteDialogComponent {
  @Input({required: true}) itemToDeleteName!: string;

  private dialogRef: MatDialogRef<DeleteDialogComponent> = inject(MatDialogRef);

  onCancel() {

    this.dialogRef.close(false);
  };

  onAgreeResults() {

    this.dialogRef.close(true);
  };

}

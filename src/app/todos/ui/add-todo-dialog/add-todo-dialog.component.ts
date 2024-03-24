import {Component, inject} from '@angular/core';
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {NgIcon, provideIcons} from "@ng-icons/core";
// Shared
import {DatepickerComponent} from "../../../shared";
// Models
import type {AddTodoForm} from "../../models";
//  Bootstrap icons.
import {bootstrapX} from '@ng-icons/bootstrap-icons';


@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIcon,
    DatepickerComponent,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle
  ],
  templateUrl: './add-todo-dialog.component.html',
  styles: ``,
  viewProviders: [
    provideIcons({bootstrapX})
  ]
})
export class AddTodoDialogComponent {
  // Puedo usar la data para comprbar si es update o add
  //public data: AddTodoDialogData = inject(MAT_DIALOG_DATA);
  public addTodoForm: FormGroup<AddTodoForm>;

  private dialogRef: MatDialogRef<AddTodoDialogComponent> = inject(MatDialogRef);
  private fb = inject(FormBuilder);

  constructor() {
    this.addTodoForm = this.initForm();
  }

  private initForm(): FormGroup<AddTodoForm> {
    return this.fb.group({
      title: ['', Validators.required],
      dueDate: [
        new Date().toISOString(), Validators.required,
      ]
    })
  }

  onCancel() {

    this.dialogRef.close();
  }

  onAgreeResults() {

    this.dialogRef.close(this.addTodoForm.value);
  }


}

import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {DatepickerComponent} from "../../../../shared";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {UserFormTypes} from "../../../models";

import {
  bootstrapEnvelope,
  bootstrapPersonCheck,
  bootstrapPersonHeart,
  bootstrapTelephone,
  bootstrapX
} from '@ng-icons/bootstrap-icons';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {AppLoadingService} from "../../../../services";
import {formatPhoneNumberForUi, handlePhoneNumberInputKeyUp} from "../../../helpers";

@Component({
  imports: [
    NgClass,
    DatepickerComponent,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgIcon,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton
  ],
  selector: 'app-edit-user-dialog',
  standalone: true,
  styles: ``,
  templateUrl: './edit-user-dialog.component.html',
  viewProviders: [
    provideIcons({
      bootstrapEnvelope,
      bootstrapPersonCheck,
      bootstrapPersonHeart,
      bootstrapTelephone,
      bootstrapX
    })
  ],
})
export class EditUserDialogComponent implements OnInit {

  public userForm: FormGroup<UserFormTypes>;
  private fb = inject(FormBuilder);
  private dialogRef: MatDialogRef<EditUserDialogComponent> = inject(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);
  private userId: string = '';

  private appLoadingService = inject(AppLoadingService);

  constructor() {
    this.userForm = this.initForm();
  }

  ngOnInit() {
    this.appLoadingService.setIsLoading(true);

    this.handleUserData();

    this.appLoadingService.setIsLoading(false);
  }

  public onCancel() {

    this.dialogRef.close();
  }

  public onAgreeResults() {

    this.dialogRef.close({userFormValues: this.userForm.value, userId: this.userId});
  }


  public handlePhoneNumberKeyUp($event: KeyboardEvent) {

    const phoneNumberControl = this.userForm.controls.phoneNumber;

    handlePhoneNumberInputKeyUp($event, phoneNumberControl);
  }

  private initForm(): FormGroup<UserFormTypes> {

    return this.fb.group({
      userName: ['', [Validators.maxLength(30), Validators.minLength(3)]],
      fullName: ['', Validators.maxLength(50)],
      phoneNumber: ['', Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)],
      role: ['user', Validators.required],
    })
  }

  private handleUserData() {
    const userData = this.data.userData;

    const {uid, phoneNumber, ...rest} = userData;

    const formatedPhoneNumber = formatPhoneNumberForUi(phoneNumber);

    this.userId = uid;

    this.userForm.patchValue({phoneNumber: formatedPhoneNumber, ...rest});
  }
}

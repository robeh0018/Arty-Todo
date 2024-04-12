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

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
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
  templateUrl: './edit-user-dialog.component.html',
  styles: ``,
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

  private initForm(): FormGroup<UserFormTypes> {

    return this.fb.group({
      userName: ['', [Validators.maxLength(30), Validators.minLength(3)]],
      fullName: ['', Validators.maxLength(50)],
      role: ['user', Validators.required],
    })
  }

  private handleUserData() {
    const userData = this.data.userData;

    const {uid, ...rest} = userData;

    this.userId = uid;

    this.userForm.patchValue({...rest});
  }

  // Phone number should have this format (111) 111-1111.
  // phoneNumber: ['', Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)],

  // private handlePhoneNumber() {
  //   const phoneNumber = this.userForm.controls.phoneNumber;
  //
  //   phoneNumber.valueChanges.subscribe(phoneNumberValue => {
  //
  //     if (phoneNumberValue?.length === 1) phoneNumber.patchValue('(' + phoneNumberValue);
  //
  //     if (phoneNumberValue?.length === 4) phoneNumber.patchValue(phoneNumberValue + ')');
  //
  //     if (phoneNumberValue?.length === 5) phoneNumber.patchValue(phoneNumberValue + ' ');
  //
  //     if (phoneNumberValue?.length === 9) phoneNumber.patchValue(phoneNumberValue + '-');
  //   })
  // };

}

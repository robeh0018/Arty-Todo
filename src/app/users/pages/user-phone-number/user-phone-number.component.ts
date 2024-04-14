import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIcon} from "@ng-icons/core";
import {UserLayoutPageComponent} from "../user-layout-page/user-layout-page.component";
import type {PhoneNumberFormTypes} from "../../models";
import {AppLoadingService} from "../../../services";
import {NgClass} from "@angular/common";
import {FirestoreUsersService} from "../../services";
import {AuthStoreService} from "../../../auth";
import {formatPhoneNumberForDb, handlePhoneNumberInputKeyUp} from "../../helpers";

@Component({
  selector: 'app-user-phone-number',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgIcon,
    ReactiveFormsModule,
    UserLayoutPageComponent
  ],
  templateUrl: './user-phone-number.component.html',
  styles: ``
})
export default class UserPhoneNumberComponent {
  public phoneNumberForm: FormGroup<PhoneNumberFormTypes>;
  public appLoadingService = inject(AppLoadingService);
  private firestoreUsersService = inject(FirestoreUsersService);
  private authStoreService = inject(AuthStoreService);
  private fb = inject(FormBuilder);

  constructor() {
    this.phoneNumberForm = this.initForm();
  }

  public async onSubmit() {
    this.appLoadingService.setIsLoading(true);

    const userId = this.authStoreService.getCurrentUserId();

    if (!userId || !this.mapPhoneNumberInputValue()) return;

    // Change phone.
    await this.firestoreUsersService.updatePhoneNumber(userId, this.mapPhoneNumberInputValue()!)

    this.appLoadingService.setIsLoading(false);

    this.phoneNumberForm.reset();
  }

  public handleKeyUp($event: KeyboardEvent) {
    const phoneNumberControl = this.phoneNumberForm.controls.phoneNumber;

    handlePhoneNumberInputKeyUp($event, phoneNumberControl);
  }

  private initForm(): FormGroup<PhoneNumberFormTypes> {
    return this.fb.group({
      //  Should have this format (111)111-1111
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]]
    });
  }

  private mapPhoneNumberInputValue() {
    const phoneNumberValue = this.phoneNumberForm.controls.phoneNumber.value;

    // Replace )(- and white space from phone number.
    return formatPhoneNumberForDb(phoneNumberValue);
  }
}

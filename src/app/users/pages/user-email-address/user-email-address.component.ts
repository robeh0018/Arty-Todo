import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIcon} from "@ng-icons/core";
import {UserLayoutPageComponent} from "../user-layout-page/user-layout-page.component";
import {EmailFormTypes} from "../../models";
import {NgClass} from "@angular/common";
import {AppLoadingService} from "../../../services";
import {AuthService} from "../../../auth";
import {DangerAlertComponent} from "../../../shared";

@Component({
  selector: 'app-user-email-address',
  standalone: true,
  imports: [
    FormsModule,
    NgIcon,
    ReactiveFormsModule,
    UserLayoutPageComponent,
    NgClass,
    DangerAlertComponent
  ],
  templateUrl: './user-email-address.component.html',
  styles: ``
})
export default class UserEmailAddressComponent {

  public emailForm: FormGroup<EmailFormTypes>;
  public appLoadingService = inject(AppLoadingService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    this.emailForm = this.initForm();
  }

  public async onSubmit() {
    this.appLoadingService.setIsLoading(true);

    // 	Change email.
    const newEmail = this.emailForm.controls.email.value;

    if (!newEmail) return;

    await this.authService.authUpdateUserEmail(newEmail);

    this.appLoadingService.setIsLoading(false);
  };

  private initForm(): FormGroup<EmailFormTypes> {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}

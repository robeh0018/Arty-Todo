import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import type {NewPasswordFormTypes} from "../../models";
import {AppLoadingService} from "../../../services";
import {AuthService} from "../../../auth";
import {UserLayoutPageComponent} from "../user-layout-page/user-layout-page.component";

@Component({
  selector: 'app-user-new-password-page',
  standalone: true,
  imports: [
    NgIcon,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    UserLayoutPageComponent
  ],
  templateUrl: './user-new-password-page.component.html',
  styles: ``
})
export default class UserNewPasswordPageComponent {
  public newPasswordForm: FormGroup<NewPasswordFormTypes>;
  public appLoadingService = inject(AppLoadingService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  constructor() {
    this.newPasswordForm = this.initForm();
  }

  public async onSubmit() {
    this.appLoadingService.setIsLoading(true);

    await this.authService.authUpdateUserPassword(this.newPasswordForm.value.password!);

    this.appLoadingService.setIsLoading(false);

    this.newPasswordForm.reset();
  }

  private initForm(): FormGroup<NewPasswordFormTypes> {
    return this.fb.group({
      password: ['', [
        Validators.required, Validators.maxLength(10),
        Validators.minLength(6)
      ]]
    });
  }

}

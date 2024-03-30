import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIcon} from "@ng-icons/core";
import {AuthTitleComponent} from "../../components";
import AuthLayoutPageComponent from "../auth-layout-page/auth-layout-page.component";
import type {ForgotPasswordFormTypes} from "../../models";
import {NgClass} from "@angular/common";
import {AppLoadingService} from "../../../services";
import {AuthService} from "../../services";

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AuthLayoutPageComponent,
    AuthTitleComponent,
    NgIcon,
    NgClass
  ],
  templateUrl: './forgot-password-page.component.html',
  styles: ``
})
export default class ForgotPasswordPageComponent {
  public forgotPasswordForm: FormGroup<ForgotPasswordFormTypes>;
  public appLoadingService = inject(AppLoadingService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  constructor() {
    this.forgotPasswordForm = this.initForm();
  }

  public async onSubmit() {
    this.appLoadingService.setIsLoading(true);

    await this.authService.authSendPasswordResetEmail(this.forgotPasswordForm.value.email!);

    this.appLoadingService.setIsLoading(false);
  }

  private initForm(): FormGroup<ForgotPasswordFormTypes> {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
}

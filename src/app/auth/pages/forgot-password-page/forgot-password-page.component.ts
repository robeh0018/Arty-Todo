import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIcon} from "@ng-icons/core";
import {AuthTitleComponent} from "../../components";
import AuthLayoutPageComponent from "../auth-layout-page/auth-layout-page.component";
import type {ForgotPasswordForm} from "../../models";
import {NgClass} from "@angular/common";
import {AppLoadingService} from "../../../services";

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
  public forgotPasswordForm: FormGroup<ForgotPasswordForm>;
  public appLoadingService = inject(AppLoadingService);
  private fb = inject(FormBuilder);

  constructor() {
    this.forgotPasswordForm = this.initForm();
  }

  public onSubmit() {
    this.appLoadingService.setIsLoading(true);

    console.log(this.forgotPasswordForm.value)

    this.appLoadingService.setIsLoading(false);
  }

  private initForm(): FormGroup<ForgotPasswordForm> {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
}

import {Component, inject} from '@angular/core';
import AuthLayoutPageComponent from "../auth-layout-page/auth-layout-page.component";
import {AuthTitleComponent} from "../../components";
import {NgIcon} from "@ng-icons/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import type {NewPasswordFormTypes} from "../../models";
import {AppLoadingService} from "../../../services";
import {AuthService} from "../../services";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-new-password-page',
  standalone: true,
  imports: [
    AuthLayoutPageComponent,
    AuthTitleComponent,
    NgIcon,
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './new-password-page.component.html',
  styles: ``
})
export default class NewPasswordPageComponent {
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

import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIcon} from "@ng-icons/core";
import {AuthTitleComponent} from "../../components";
import AuthLayoutPageComponent from "../auth-layout-page/auth-layout-page.component";
import type {ForgotPasswordForm} from "../../models";

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AuthLayoutPageComponent,
    AuthTitleComponent,
    NgIcon
  ],
  templateUrl: './forgot-password-page.component.html',
  styles: ``
})
export default class ForgotPasswordPageComponent {
  private fb = inject(FormBuilder);

  forgotPasswordForm: FormGroup<ForgotPasswordForm>;

  constructor() {
    this.forgotPasswordForm = this.initForm();
  }


  private initForm(): FormGroup<ForgotPasswordForm> {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  public onSubmit() {
    console.log(this.forgotPasswordForm.value)
  }
}

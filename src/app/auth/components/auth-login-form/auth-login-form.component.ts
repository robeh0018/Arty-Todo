import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import type {LoginFormTypes} from "../../models";
import {AuthService} from "../../services";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-auth-login-form',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './auth-login-form.component.html',
  styles: ``
})
export class AuthLoginFormComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public loginForm: FormGroup<LoginFormTypes>;

  constructor() {
    this.loginForm = this.initForm();
  }

  private initForm(): FormGroup<LoginFormTypes> {
    return this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email]
      ],
      password: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(6)]
      ]
    })
  }

  public async onSubmit(): Promise<void> {

    const {email, password} = this.loginForm.value;

    // Here the values never will be null with form validations.
    await this.authService.loginWithEmailAndPassword(email!, password!);
  }
}

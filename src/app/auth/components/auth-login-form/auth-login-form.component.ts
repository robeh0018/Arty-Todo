import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import type {LoginForm} from "../../models";

@Component({
  selector: 'app-auth-login-form',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './auth-login-form.component.html',
  styles: ``
})
export class AuthLoginFormComponent {

  private fb = inject(FormBuilder);

  public loginForm: FormGroup<LoginForm>;

  constructor() {
    this.loginForm = this.initForm();
  }

  private initForm(): FormGroup<LoginForm> {
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

  public onSubmit(): void {
    console.log(this.loginForm.value)
  }
}

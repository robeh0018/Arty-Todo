import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import type {RegisterForm} from "../../models";

@Component({
  selector: 'app-auth-register-form',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './auth-register-form.component.html',
  styles: ``
})
export class AuthRegisterFormComponent {

  private fb = inject(FormBuilder);

  public registerForm: FormGroup<RegisterForm>;

  constructor() {
    this.registerForm = this.initForm();
  }

  private initForm(): FormGroup<RegisterForm> {
    return this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
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
    console.log(this.registerForm.value)
  }
}

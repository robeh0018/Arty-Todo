import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services";
import type {RegisterFormTypes} from "../../models";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-auth-register-form',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './auth-register-form.component.html',
  styles: ``
})
export class AuthRegisterFormComponent {

  public registerForm: FormGroup<RegisterFormTypes>;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    this.registerForm = this.initForm();
  }

  public async onSubmit() {
    const {email, password, userName, fullName} = this.registerForm.value;

    // Here the values never will be null with form validations.
    await this.authService.signUpWithEmailAndPassword(
      {
        email: email!,
        userName: userName!,
        fullName: fullName!,
        password: password!
      }
    )
  };

  private initForm(): FormGroup<RegisterFormTypes> {
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
}

import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-auth-toggle-sign-in-sign-up',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <span>
      {{ isSignIn ? 'Do not have an account?' : 'I have an account already!' }}
      <a
        [routerLink]="isSignIn ? '/auth/register' : '/auth/login'"
        class="text-center hover:text-pink-300 underline underline-offset-2 rounded on-focus transition-all">
    {{ isSignIn ? 'Sign up' : 'Sign in' }}
  </a>
    </span>
  `,
  styles: ``
})
export class AuthToggleSignInSignUpComponent {
  @Input({required: true}) isSignIn!: boolean;
}

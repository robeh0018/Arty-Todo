import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {
  AuthLoginFormComponent,
  AuthSignInOptionsComponent,
  AuthTitleComponent,
  AuthToggleSignInSignUpComponent
} from "../../components";
import AuthLayoutPageComponent from "../auth-layout-page/auth-layout-page.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    AuthLayoutPageComponent,
    AuthTitleComponent,
    AuthLoginFormComponent,
    AuthSignInOptionsComponent,
    AuthToggleSignInSignUpComponent,
  ],
  templateUrl: './login-page.component.html',
  styles: ``
})
export default class LoginPageComponent {
}

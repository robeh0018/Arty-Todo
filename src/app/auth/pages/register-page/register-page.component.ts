import {Component} from '@angular/core';
import AuthLayoutPageComponent from "../auth-layout-page/auth-layout-page.component";
import {AuthRegisterFormComponent, AuthTitleComponent, AuthToggleSignInSignUpComponent} from "../../components";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    AuthLayoutPageComponent,
    AuthTitleComponent,
    AuthToggleSignInSignUpComponent,
    AuthRegisterFormComponent
  ],
  templateUrl: './register-page.component.html',
  styles: ``
})
export default class RegisterPageComponent {

}

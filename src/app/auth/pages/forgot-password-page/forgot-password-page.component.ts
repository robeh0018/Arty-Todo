import {Component} from '@angular/core';
import {AuthTitleComponent} from "../../components";
import {NgIcon} from "@ng-icons/core";
import AuthLayoutPageComponent from "../auth-layout-page/auth-layout-page.component";

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [
    AuthLayoutPageComponent,
    AuthTitleComponent,
    NgIcon
  ],
  templateUrl: './forgot-password-page.component.html',
  styles: ``
})
export default class ForgotPasswordPageComponent {

}

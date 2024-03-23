import {Component} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-auth-login-form',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink
  ],
  templateUrl: './auth-login-form.component.html',
  styles: ``
})
export class AuthLoginFormComponent {

}

import {Component} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-auth-register-form',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink
  ],
  templateUrl: './auth-register-form.component.html',
  styles: ``
})
export class AuthRegisterFormComponent {

}

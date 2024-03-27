import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {AuthService} from "../../../auth";


@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    NgIcon
  ],
  templateUrl: './user-profile-page.component.html',
  styles: ``
})
export default class UserProfilePageComponent {

  private authService = inject(AuthService);

  public async handleSignOut() {
    await this.authService.signUp()
  }
}

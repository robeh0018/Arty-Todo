import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {AuthService} from "../../../auth";
import {AppLoadingService} from "../../../services";


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

  public appLoadingService = inject(AppLoadingService);
  private authService = inject(AuthService);

  public async handleSignOut() {

    this.appLoadingService.setIsLoading(true);

    await this.authService.signUp();

    this.appLoadingService.setIsLoading(false);
  }
}

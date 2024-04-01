import {Component, inject, Signal} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {NgOptimizedImage} from "@angular/common";
import {AuthService, AuthStoreService} from "../../../auth";
import {AppLoadingService} from "../../../services";
import {User} from "../../models";


@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    NgIcon,
    NgOptimizedImage
  ],
  templateUrl: './user-profile-page.component.html',
  styles: ``
})
export default class UserProfilePageComponent {
  public currentUser: Signal<User | null>;
  public appLoadingService = inject(AppLoadingService);
  private authService = inject(AuthService);
  private authStoreService = inject(AuthStoreService);

  constructor() {
    this.currentUser = this.authStoreService.getCurrentUser();
  }

  public async handleSignOut() {

    this.appLoadingService.setIsLoading(true);

    await this.authService.authSignOut();

    this.appLoadingService.setIsLoading(false);
  }
}

import {Component, inject, Signal} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {NgOptimizedImage} from "@angular/common";
import {AuthService, AuthStoreService} from "../../../auth";
import {AppLoadingService} from "../../../services";
import {User} from "../../models";
import {MatTooltip} from "@angular/material/tooltip";
import {formatPhoneNumberForUi} from "../../helpers";
import {UserLayoutPageComponent} from "../user-layout-page/user-layout-page.component";


@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    NgIcon,
    NgOptimizedImage,
    MatTooltip,
    UserLayoutPageComponent
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
    console.log(this.currentUser()?.photoURL)
  }

  public handlePhoneNumberUi(phoneNumber: string | null) {
    return formatPhoneNumberForUi(phoneNumber);
  };

  public async handleSignOut() {

    this.appLoadingService.setIsLoading(true);

    await this.authService.authSignOut();

    this.appLoadingService.setIsLoading(false);
  }
}

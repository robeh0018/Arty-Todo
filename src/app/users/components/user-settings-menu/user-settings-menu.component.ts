import {Component, inject, Signal} from '@angular/core';
import {MatMenuModule} from "@angular/material/menu";
import {NgIcon} from "@ng-icons/core";
import {User} from "../../models";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {AuthService, AuthStoreService} from "../../../auth";
import {AppLoadingService} from "../../../services";

@Component({
  selector: 'app-user-settings-menu',
  standalone: true,
  imports: [
    MatMenuModule,
    NgIcon,
    NgClass,
    RouterLink,
    MatDivider,
  ],
  templateUrl: './user-settings-menu.component.html',
  styles: `
  `
})
export class UserSettingsMenuComponent {
  public currentUser: Signal<User | null>;

  private authStoreService = inject(AuthStoreService);
  private authService = inject(AuthService);
  private appLoadingService = inject(AppLoadingService);

  constructor() {
    this.currentUser = this.authStoreService.getCurrentUser();
  }

  async handleEmailVerification(): Promise<void> {
    this.appLoadingService.setIsLoading(true);

    await this.authService.authSendEmailVerification();

    this.appLoadingService.setIsLoading(false);
  }

  async handleSignOut(): Promise<void> {
    this.appLoadingService.setIsLoading(true);

    await this.authService.authSignOut();

    this.appLoadingService.setIsLoading(false);
  }
}

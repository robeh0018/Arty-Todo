import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {AuthService} from "../../services";
import {AppLoadingService} from "../../../services";

@Component({
  selector: 'app-auth-sign-in-options',
  standalone: true,
  imports: [
    NgIcon
  ],
  templateUrl: './auth-sign-in-options.component.html',
  styles: ``
})
export class AuthSignInOptionsComponent {

  public appLoadingService = inject(AppLoadingService);
  private authService = inject(AuthService);

  public async onGoogleAuthentication() {
    this.appLoadingService.setIsLoading(true);

    await this.authService.authAuthenticateWithGoogle();

    this.appLoadingService.setIsLoading(false);
  }

  public async onGithubAuthentication() {
    this.appLoadingService.setIsLoading(true);

    await this.authService.authAuthenticateWithGithub();

    this.appLoadingService.setIsLoading(false);
  }

  public async onFacebookAuthentication() {
    this.appLoadingService.setIsLoading(true);

    await this.authService.authAuthenticateWithFacebook();

    this.appLoadingService.setIsLoading(false);
  }
}

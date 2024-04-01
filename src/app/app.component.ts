import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIconComponent, provideIcons} from "@ng-icons/core";
import {MatRipple} from "@angular/material/core";
// Bootstrap icons.
import {
  bootstrapArrowBarLeft,
  bootstrapCheckCircle,
  bootstrapCircle,
  bootstrapEmojiGrin,
  bootstrapEnvelope,
  bootstrapEnvelopeCheck,
  bootstrapEnvelopeX,
  bootstrapFacebook,
  bootstrapGear,
  bootstrapGithub,
  bootstrapGoogle,
  bootstrapKey,
  bootstrapListTask,
  bootstrapPerson,
  bootstrapPersonCheck,
  bootstrapPersonHeart,
  bootstrapPlus,
  bootstrapSearch,
  bootstrapTrash
} from '@ng-icons/bootstrap-icons';
import {MatProgressBar} from "@angular/material/progress-bar";
import {AppLoadingService} from "./services";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent, MatRipple, MatProgressBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [
    provideIcons({
      bootstrapCircle,
      bootstrapCheckCircle,
      bootstrapSearch,
      bootstrapTrash,
      bootstrapPlus,
      bootstrapListTask,
      bootstrapPerson,
      bootstrapEmojiGrin,
      bootstrapEnvelope,
      bootstrapKey,
      bootstrapGoogle,
      bootstrapFacebook,
      bootstrapGithub,
      bootstrapPersonHeart,
      bootstrapPersonCheck,
      bootstrapArrowBarLeft,
      bootstrapEnvelopeX,
      bootstrapGear,
      bootstrapEnvelopeCheck
    })
  ],
})

export class AppComponent {
  public appLoadingService = inject(AppLoadingService);
  // public router = inject(Router);
  // private authService = inject(AuthService);
  //
  // constructor() {
  // }
  //
  // async ngOnInit() {
  //   await this.handleUserReAuthentication();
  // }
  //
  // private async handleUserReAuthentication() {
  //   this.appLoadingService.setIsLoading(true);
  //
  //   // This is the way can I do to keep user logging In, on Angular Server Side.
  //   const authenticatedUser = await this.authService.reauthenticateUserIfIsPossible();
  //
  //   if (authenticatedUser) await this.router.navigate(['/todos']);
  //
  //   this.appLoadingService.setIsLoading(false);
  // }
}

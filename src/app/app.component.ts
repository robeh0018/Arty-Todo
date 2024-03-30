import {afterNextRender, Component, inject, signal, WritableSignal} from '@angular/core';
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
import {AuthStoreService} from "./auth";
import {User} from "./users";

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
  private authStoreService = inject(AuthStoreService);
  private currentUser: WritableSignal<User | null> = signal<User | null>(null);


  constructor() {
    // afterNextRender(() => {
    //   this.syncUserWithLocalStorage();
    // })
  }

  // private syncUserWithLocalStorage() {
  //   const userData = (JSON.parse(localStorage.getItem('userData')!) as User) ?? null;
  //
  //   console.log(userData)
  //   if (!this.authStoreService.getLoggedUser()()) {
  //
  //     if (userData === null) {
  //       return this.authStoreService.setLoggedUser(null);
  //     }
  //
  //     return this.authStoreService.setLoggedUser(userData);
  //   }
  //
  //   localStorage.setItem('userData', JSON.stringify(this.authStoreService.getLoggedUser()()));
  // }
}

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
  bootstrapFacebook,
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
      bootstrapArrowBarLeft
    })
  ],
})

export class AppComponent {
  public appLoadingService = inject(AppLoadingService);

}

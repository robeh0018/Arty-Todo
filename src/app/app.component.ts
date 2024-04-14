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
  bootstrapPencil,
  bootstrapPeople,
  bootstrapPerson,
  bootstrapPersonCheck,
  bootstrapPersonHeart,
  bootstrapPlus,
  bootstrapSearch,
  bootstrapTrash,
  bootstrapTelephone,
  bootstrapInfoCircle
} from '@ng-icons/bootstrap-icons';
import {MatProgressBar} from "@angular/material/progress-bar";
import {AppLoadingService} from "./services";

@Component({
  imports: [RouterOutlet, NgIconComponent, MatRipple, MatProgressBar],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
  viewProviders: [
    provideIcons({
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
      bootstrapInfoCircle,
      bootstrapKey,
      bootstrapListTask,
      bootstrapPencil,
      bootstrapPeople,
      bootstrapPerson,
      bootstrapPersonCheck,
      bootstrapPersonHeart,
      bootstrapPlus,
      bootstrapSearch,
      bootstrapTelephone,
      bootstrapTrash
    })
  ],
})

export class AppComponent {
  public appLoadingService = inject(AppLoadingService);
}

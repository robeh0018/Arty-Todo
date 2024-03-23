import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIconComponent, provideIcons} from "@ng-icons/core";
import {MatRipple} from "@angular/material/core";
// Bootstrap icons.
import {
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent, MatRipple],
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
      bootstrapPersonCheck
    })
  ],
})
export class AppComponent {
}

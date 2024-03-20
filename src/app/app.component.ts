import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIconComponent, provideIcons} from "@ng-icons/core";
// Bootstrap icons.
import {
  bootstrapCheckCircle,
  bootstrapCircle,
  bootstrapPlus,
  bootstrapSearch,
  bootstrapTrash
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [
    provideIcons({
      bootstrapCircle,
      bootstrapCheckCircle,
      bootstrapSearch,
      bootstrapTrash,
      bootstrapPlus
    })
  ],
})
export class AppComponent {
}

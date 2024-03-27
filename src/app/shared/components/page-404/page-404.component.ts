import {Component, inject} from '@angular/core';
import {SmileEmojiComponent} from "../smile-emoji/smile-emoji.component";
import {NgIcon} from "@ng-icons/core";
import {RouterLink} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [
    SmileEmojiComponent,
    NgIcon,
    RouterLink
  ],
  template: `
    <div class="flex flex-col md:flex-row items-center gap-5 justify-center h-screen">

      <div class="text-center tracking-wider">
        <h1 class="text-9xl text-pink-400 font-bold">404</h1>

        <h3 class="text-5xl flex items-center gap-1">Page not found
          <span>
           <app-smile-emoji/>
          </span>
        </h3>
      </div>

      <div class="flex flex-col  items-start gap-5">

        <div class="text-pretty tracking-wide font-light">
          <p>It's looking like you may have taken a wrong turn.</p>
          <p>Don't worry, just go back.</p>
        </div>

        <a
          routerLink=""
          (click)="navigateToPreviousRute()"
          class="font-medium w-[50%] rounded-lg text-sm px-5 py-2.5 text-center bg-pink-600 hover:bg-pink-500 on-focus transition-all"
        >
          Back
        </a>

      </div>

    </div>
  `,
  styles: ``
})
export default class Page404Component {

  private location = inject(Location);

  navigateToPreviousRute() {
    this.location.back();
  }
}

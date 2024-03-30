import {Component, Input} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {SmileEmojiComponent} from "../../../shared";

@Component({
  selector: 'app-auth-title',
  standalone: true,
  imports: [
    NgIcon,
    SmileEmojiComponent
  ],
  template: `
    <div class="text-center antialiased">
      <!--Title-->
      <h1 class="text-3xl font-extrabold">
        {{ title }}
      </h1>

      <!--Subtitle-->
      <p class="mt-1">
        {{ subtitle }}
      </p>

      <!--Emoji-->
      @if (showEmoji) {
        <app-smile-emoji class="mt-1"/>
      }

      <!-- Other text-->
      @if (otherText) {
        <p class="mt-1">{{ otherText }}</p>
      }

    </div>
  `,
  styles: ``
})
export class AuthTitleComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) subtitle!: string;
  @Input() otherText: string | undefined;
  @Input() showEmoji: boolean = true;
}

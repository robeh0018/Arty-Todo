import {Component, Input} from '@angular/core';
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-auth-title',
  standalone: true,
  imports: [
    NgIcon
  ],
  template: `
    <div class="text-center antialiased">
      <!--Title-->
      <h1 class="text-3xl font-extrabold ">
        {{ title }}
      </h1>

      <!--Subtitle-->
      <p class="mt-1">
        {{ subtitle }}
      </p>

      <ng-icon
        style="view-transition-name: todo-app-emoji"
        class="text-pink-400 mt-1" name="bootstrapEmojiGrin"/>

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
}

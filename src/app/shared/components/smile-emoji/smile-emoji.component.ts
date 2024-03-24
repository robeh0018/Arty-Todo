import {Component} from '@angular/core';
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-smile-emoji',
  standalone: true,
  imports: [
    NgIcon
  ],
  template: `
    <ng-icon
      style="view-transition-name: todo-app-emoji"
      class="text-pink-400 text-xl hover:animate-spin transition-all"
      name='bootstrapEmojiGrin'
    />
  `,
  styles: ``
})
export class SmileEmojiComponent {

}

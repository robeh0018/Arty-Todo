import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <div class="border-t-1 border-pink-400 antialiased px-5 py-10 mb-0 pointer-events-none">

        <!--Copyright-->
        <div class="text-center">
          <p class="text-gray-400 text-sm">2024 - All Rights Reserved</p>
        </div>

      </div>
    </footer>
  `,
  styles: ``
})
export class FooterComponent {

}

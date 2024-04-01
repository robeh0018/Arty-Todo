import { Component } from '@angular/core';

@Component({
  selector: 'app-user-layout-page',
  standalone: true,
  imports: [],
  template: `
    <main class="flex h-full w-screen tracking-wider">
      <div
        class="m-auto flex flex-col items-center justify-center gap-4 w-full sm:max-w-[450px] md:max-w-[350px] px-1 sm:px-2">

        <ng-content/>
      </div>
    </main>
  `,
  styles: ``
})
export class UserLayoutPageComponent {

}

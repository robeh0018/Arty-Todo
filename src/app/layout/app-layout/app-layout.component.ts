import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {FooterComponent, NavBarComponent} from "../../shared";

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    FooterComponent
  ],
  template: `
    <div class="h-dvh">
      <!--Navbar-->
      <header>
        <app-nav-bar/>
      </header>

      <router-outlet/>

      <!--Footer-->
      <app-footer/>
    </div>
  `,
  styles: ``
})
export default class AppLayoutComponent {

}

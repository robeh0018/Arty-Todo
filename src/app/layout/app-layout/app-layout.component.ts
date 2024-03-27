import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavBarComponent} from "../../shared";

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent
  ],
  template: `
    <!--Navbar-->
    <app-nav-bar/>

    <div class="mt-20">

      <router-outlet/>

    </div>
    <!--Footer-->
  `,
  styles: ``
})
export default class AppLayoutComponent {

}

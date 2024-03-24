import {Component} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatRipple} from "@angular/material/core";
import {SmileEmojiComponent} from "../smile-emoji/smile-emoji.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink,
    RouterLinkActive,
    MatRipple,
    SmileEmojiComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styles: ``
})
export class NavBarComponent {

  public navListItems!: { title: string; iconName: string; href: string }[];

  constructor() {

    this.navListItems = [
      {
        title: 'Todos',
        iconName: `bootstrapListTask`,
        href: '/todos'
      },
      {
        title: 'Authentication',
        iconName: `bootstrapPerson`,
        href: '/auth'
      },

    ]
  }

}

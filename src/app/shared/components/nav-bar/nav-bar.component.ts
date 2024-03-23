import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {MatRipple} from "@angular/material/core";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink,
    RouterLinkActive,
    MatRipple,
  ],
  templateUrl: './nav-bar.component.html',
  styles: ``
})
export class NavBarComponent {
  private route = inject(ActivatedRoute);


  public navListItems!: { title: string; iconName: string; href: string }[];

  constructor() {
      this.route.data.subscribe( res => console.log(res))

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

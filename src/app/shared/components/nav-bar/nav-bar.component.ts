import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatRipple} from "@angular/material/core";
import {SmileEmojiComponent} from "../smile-emoji/smile-emoji.component";
import {UserSettingsMenuComponent} from "../../../users";
import {AuthStoreService} from "../../../auth";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink,
    RouterLinkActive,
    MatRipple,
    SmileEmojiComponent,
    UserSettingsMenuComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styles: ``
})
export class NavBarComponent implements OnInit {
  public isUserAdmin: WritableSignal<boolean> = signal<boolean>(false);
  private authStoreService = inject(AuthStoreService);


  ngOnInit() {
    const isAdmin = this.authStoreService.getCurrentUser()()?.role === 'admin';

    this.isUserAdmin.set(isAdmin);
  }
}

import {Component, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {UserLayoutPageComponent} from "../user-layout-page/user-layout-page.component";
import {User, UserTableData} from "../../models";
import {UsersDataTableComponent} from "../../components";
import {AdminUsersService} from "../../services";


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserLayoutPageComponent,
    UsersDataTableComponent
  ],
  templateUrl: './user-list.component.html',
  styles: ``
})
export default class UserListComponent implements OnInit {
  public usersTableData: WritableSignal<UserTableData[]> = signal<UserTableData[]>([]);
  private adminUsersService = inject(AdminUsersService);

  constructor() {
    effect(() => {
      this.handleUsers();

    }, {allowSignalWrites: true});
  }

  async ngOnInit() {
    await this.adminUsersService.adminLoadUsers();
  }

  private handleUsers() {
    const users = this.adminUsersService.getUsers();

    const usersTableData = this.mapToUsersTableData(users());

    this.usersTableData.set(usersTableData);
  }

  private mapToUsersTableData(usersOnDb: User[]): UserTableData[] {
    return usersOnDb.map((userDb, index) => {
      const {uid, photoURL, ...rest} = userDb;

      return {
        No: index + 1,
        ...rest
      };
    });
  };
}

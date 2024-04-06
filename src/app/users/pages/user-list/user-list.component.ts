import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {UserLayoutPageComponent} from "../user-layout-page/user-layout-page.component";
import {FirestoreUsersService} from "../../services";
import {UserTableData} from "../../models";
import {UsersDataTableComponent} from "../../components/users-data-table";


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
  private firestoreUsersService = inject(FirestoreUsersService);

  async ngOnInit() {
    await this.getUsersFromFirestoreDb();
  }

  private async getUsersFromFirestoreDb() {
    const usersOnDb = await this.firestoreUsersService.getAllUsers();

    const usersTableData: UserTableData[] = usersOnDb.map((userDb, index) => {
      const {uid, photoURL, ...rest} = userDb;

      return {
        No: index + 1,
        ...rest
      };
    });

    this.usersTableData.set(usersTableData);
  }
}

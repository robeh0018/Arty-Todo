import {Component, inject, Input} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";
import {EditUserDialogComponent} from "../ui";
import {UserFormTypes} from "../../models";
import {FirestoreUsersService} from "../../services";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    NgIcon
  ],
  template: `
    <button
      (click)="handleEditUser()"
      class="rounded-3xl p-1 flex items-center ms-1 focus:outline-none focus:ring-1 focus:ring-blue-400 hover:scale-125 transition-all"
      type="button">
      <ng-icon class="text-blue-400" name="bootstrapPencil"/>
    </button>
  `,
  styles: ``
})
export class EditUserComponent {

  @Input({required: true}) userEmail!: string;
  private dialog: MatDialog = inject(MatDialog);
  private firestoreUsersService = inject(FirestoreUsersService);


  handleEditUser() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        userData: this.getUserData(),
      },

      width: '30rem',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((result: UserFormTypes) => {
      console.log(result)
    })
  }


  private async getUserData() {
    const users = await this.firestoreUsersService.getUsersByEmail(this.userEmail);

    // if (users.length === 0) return;

    return users.map(({email, userName, fullName, role, phoneNumber}) => ({
      email,
      userName,
      fullName,
      phoneNumber,
      role,
    }))[0];
  }
}

import {Component, inject, Input} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";
import {EditUserDialogComponent} from "../ui";
import {UserUpdatePayload} from "../../models";
import {AdminUsersService} from "../../services";
import {AppLoadingService} from "../../../services";
import {formatPhoneNumberForDb} from "../../helpers";

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
  private adminUsersService = inject(AdminUsersService);
  private appLoadingService = inject(AppLoadingService);


  handleEditUser() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        userData: this.getUserData(),
      },
      disableClose: true,
      width: '30rem',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(async (result: {
      userFormValues: UserUpdatePayload,
      userId: string
    }) => {
      if (result !== undefined) {
        this.appLoadingService.setIsLoading(true);

        const {phoneNumber, ...rest} = result.userFormValues;

        const formatedPhoneNumber = formatPhoneNumberForDb(phoneNumber);

        await this.adminUsersService.adminUpdateUser(result.userId, {phoneNumber: formatedPhoneNumber, ...rest})

        this.appLoadingService.setIsLoading(false);
      }
    })
  }


  private getUserData() {
    const users = this.adminUsersService.getUserByEmail(this.userEmail);

    // if (users.length === 0) return;

    return users.map(({uid, userName, fullName, role, phoneNumber}) => ({
      uid,
      userName,
      fullName,
      phoneNumber,
      role,
    }))[0];
  }
}

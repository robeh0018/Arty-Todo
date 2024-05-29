import {Component, inject, Signal} from '@angular/core';
import {MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef} from "@angular/material/snack-bar";
import {take} from "rxjs";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {bootstrapX} from "@ng-icons/bootstrap-icons";
import {AuthStoreService} from "../../services";

@Component({
  selector: 'app-auth-error-message',
  standalone: true,
  imports: [
    MatSnackBarActions,
    MatSnackBarAction,
    MatSnackBarLabel,
    NgIcon
  ],
  viewProviders: [
    provideIcons({bootstrapX})
  ],
  template: `
    <div class="flex items-center">
      <span style="color: #ef4444; font-weight: bold" matSnackBarLabel>
        {{ errorMessage() }}, try again later.
      </span>

      <span matSnackBarActions>
        <button
          matSnackBarAction
          (click)="snackBarRef.dismissWithAction()"
          type="button"
          class="bg-transparent text-neutral-900 hover:bg-red-500 hover:text-pink-100 hover:rotate-90 rounded-lg w-8 h-8 inline-flex justify-center items-center on-focus transition-all"
        >

    <ng-icon
      class="text-2xl"
      name="bootstrapX"/>

    <span class="sr-only">Close modal</span>
  </button>
      </span>
    </div>
  `,
  styles: ``
})
export class AuthErrorMessageComponent {
  public snackBarRef = inject(MatSnackBarRef);
  public errorMessage: Signal<string | null>;

  private authStoreService = inject(AuthStoreService);

  constructor() {
    this.errorMessage = this.authStoreService.getAuthError();

    this.snackBarRef.afterDismissed()
      .pipe(take(1))
      .subscribe(() => {
        this.authStoreService.setAuthError(null);
      })
  }
}

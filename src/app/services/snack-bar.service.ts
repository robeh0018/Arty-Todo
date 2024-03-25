import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ComponentType} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  //  Mat SnackBar service.
  private _snackBar: MatSnackBar = inject(MatSnackBar);


  public showSuccessSnackBar(message?: string) {
    this._snackBar.open(`${message ? message : 'Action'} successfully!`, 'dismiss', {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 3000,
    })
  }

  public showFailSnackBar(message?: string) {
    this._snackBar.open(`${message ? message : 'Action'} failed!`, 'dismiss', {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 3000,
    })
  }

  public showSnackBarFromComponent(component: ComponentType<unknown>) {
    this._snackBar.openFromComponent(component, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 10000,
    });
  }

}

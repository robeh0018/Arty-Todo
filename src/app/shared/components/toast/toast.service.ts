import {Injectable, Signal, signal, WritableSignal} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private isOpenToast: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
  }

  getToastVisibility(): Signal<boolean> {
    return this.isOpenToast.asReadonly();
  }

  onShowToast(): void {
    console.log('show')
    this.isOpenToast.set(true);
  }

  onHideToast(): void {
    console.log('hide');
    this.isOpenToast.set(false);
  }
}

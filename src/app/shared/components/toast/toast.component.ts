import {Component, inject} from '@angular/core';
import {ToastService} from "./toast.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './toast.component.html',
  styles: ``
})
export class ToastComponent {

  public toastService: ToastService = inject(ToastService);

  constructor() {
  }
}

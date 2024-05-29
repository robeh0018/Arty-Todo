import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-danger-alert',
  standalone: true,
  imports: [],
  template: `
    <div class="mt-1 p-2 bg-default border border-dashed border-r-0 border-l-0 border-red-600 rounded-lg text-red-500">
      <p>
        {{ alertText }}
      </p>
    </div>
  `,
  styles: ``
})
export class DangerAlertComponent {
  @Input({required: true}) public alertText!: string;

}

import {Component, inject, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {FormGroup, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    MatDatepickerModule,
    ReactiveFormsModule,
    NgClass,
  ],
  template: `
    <form
      [formGroup]="rootForm"
      class="flex items-center justify-center gap-2 mb-5 text-pink-100 w-full"
    >

      <div class="flex flex-col gap-1 w-full h-16">
        <label class="font-medium text-sm" for="dueDate">Due Date</label>
        <input
          id="dueDate"
          [formControlName]="formControlNameD"
          [matDatepicker]="picker"
          [ngClass]="{
        'focus:ring-red-400 focus:ring-offset-red-400 border-red-400':
         getFormControl(formControlNameD)?.invalid &&
        (getFormControl(formControlNameD)?.touched || getFormControl(formControlNameD)?.dirty)
      }"
          [max]="maxDate"
          [min]="minDate"
          class="w-full bg-black bg-opacity-20 rounded border border-gray-800 py-2 px-3.5 text-sm -tracking-tighter on-focus"
        >
        @if (getFormControl(formControlNameD)?.invalid &&
        (getFormControl(formControlNameD)?.touched || getFormControl(formControlNameD)?.dirty)) {
          <!--Min Date info message-->
          <span class="text-xs text-red-400">
            <span class="font-bold">Min Date:</span>
            {{ minDate.toDateString() }}
          </span>
          <!--Max Date info message-->
          <span class="text-xs text-red-400">
               <span class="font-bold">Max Date:</span>
            {{ maxDate.toDateString() }}
          </span>
        }
      </div>

      <mat-datepicker-toggle class="h-5 w-5" [for]="picker">
        <mat-datepicker #picker panelClass="bg-default"></mat-datepicker>
      </mat-datepicker-toggle>

    </form>
  `,
  providers: [provideNativeDateAdapter()],
  styles: ``
})
export class DatepickerComponent implements OnInit {
  @Input({required: true}) formControlNameD!: string;
  public rootForm!: FormGroup;

  public minDate: Date;
  public maxDate: Date;

  private rootFormGroup: FormGroupDirective = inject(FormGroupDirective);

  constructor() {
    // Set the minimum to current date and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.rootForm = this.rootFormGroup.control;
  }

  getFormControl(name: string) {
    return this.rootFormGroup.control.get(name);
  }
}

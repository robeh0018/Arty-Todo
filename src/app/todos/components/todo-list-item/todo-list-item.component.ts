import {Component, Input} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
// Models.
import {Todo} from "../../models";
// Helpers.
import {formatDatesForUI} from "../../../helpers";

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [
    NgIcon
  ],
  template: `
    <li
      class="px-2 flex justify-between items-center rounded hover:bg-pink-500 cursor-move transition-all w-full relative"
    >
      <!--Icon and Title-->
      <div class="-tracking-tight flex items-center">

        @if (!todo.completed) {
          <ng-icon name="bootstrapCircle"></ng-icon>
        } @else {
          <ng-icon name="bootstrapCheckCircle"></ng-icon>
        }

        <p class="ms-3 max-w-[230px] sm:max-w-[300px] truncate"> {{ todo.title }}</p>
      </div>

      <div>
        <!-- Date-->
        <p class="text-gray-400 text-sm capitalize">{{ formatDatesForUI(todo.date) }}</p>
      </div>
    </li>
  `,
  styles: ``
})
export class TodoListItemComponent {
  @Input({required: true}) todo!: Todo;

  protected readonly formatDatesForUI = formatDatesForUI;
}

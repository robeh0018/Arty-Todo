import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-todo-list-head-section',
  standalone: true,
  imports: [],
  template: `
    <div class="flex justify-between items-center text-sm mt-5 ps-2 pe-9">

      <div class="flex items-center ">

        <h3 class="text-pink-300 -tracking-tighter">{{ title }}</h3>
        <span class="ms-3 text-gray-400"> {{ itemsQuantity }} {{ itemsQuantity === 1 ? 'item' : 'items' }} </span>

      </div>

      <p class="text-gray-400">Due</p>
    </div>
  `,
  styles: ``
})
export class TodoListHeadSectionComponent {

  @Input({required: true}) title!: string;
  @Input({required: true}) itemsQuantity!: number;
}

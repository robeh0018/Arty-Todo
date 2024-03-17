import {Component, inject} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
// Models.
import type {Todo} from "../../../models";
// Services
import {TodosService} from "../../../services";
// Components.
import {TodoListHeadSectionComponent} from "../todo-list-head-section/todo-list-head-section.component";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {DeleteTodoComponent} from "../delete-todo/delete-todo.component";


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgIcon,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    TodoListHeadSectionComponent,
    TodoListItemComponent,
    DeleteTodoComponent
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent {
  public todosService = inject(TodosService);

  constructor() {
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      //  Toggle completed on toDos.
      const todoId = event.item.data;

      this.todosService.toggleComplete(todoId);
    }
  }
}

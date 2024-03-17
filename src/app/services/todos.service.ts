import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
// UUID generator.
import {v4 as uuidV4} from 'uuid';

// Models
import type {Todo} from "../models";

// Testing data.
import {initialTodos} from "../data/todos";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos: WritableSignal<Todo[]> = signal<Todo[]>([]);
  private searchedTodos: WritableSignal<Todo[]> = signal<Todo[]>([]);

  public notCompletedTodos: Signal<Todo[]> = computed(
    () => {

      if (this.searchedTodos().length > 0) {
        return this.searchedTodos().filter(todo => !todo.completed);
      }

      return this.todos().filter(todo => !todo.completed);
    }
  );

  public completedTodos: Signal<Todo[]> = computed(
    () => {

      if (this.searchedTodos().length > 0) {
        return this.searchedTodos().filter(todo => todo.completed);
      }

      return this.todos().filter(todo => todo.completed);
    }
  );

  public searchedTodosCount: Signal<number> = computed(() => this.searchedTodos().length);

  constructor() {
    this.todos.set(initialTodos);
  }

  public addTodo(title: string, dueDate: Date): void {

    if (this.searchedTodosCount() > 0) {
      this.updateSignalOnAddTodo(this.searchedTodos, {title, dueDate});
    }


    this.updateSignalOnAddTodo(this.todos, {title, dueDate});
  };


  public deleteTodo(id: string): void {
    if (this.searchedTodosCount() > 0) {
      this.searchedTodos.update(searchedTodos => searchedTodos.filter(todo => todo.id !== id));
    }

    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  };

  public toggleComplete(todoId: string): void {

    if (this.searchedTodosCount() > 0) {

      this.updateSignalOnToggleComplete(this.searchedTodos, todoId);
    }

    this.updateSignalOnToggleComplete(this.todos, todoId);
  };


  public searchTodos(searchValue: string): void {

    this.searchedTodos.set(this.todos());

    const searchResult = this.searchedTodos().filter(
      todo => todo.title.toLowerCase().includes(searchValue.toLowerCase()))

    this.searchedTodos.set(searchResult);
  }

  public resetSearch(): void {
    this.searchedTodos.set([]);
  }


  //  Private methods.
  private updateSignalOnAddTodo(signal: WritableSignal<Todo[]>, fields: { title: string, dueDate: Date }): void {
    const {title, dueDate} = fields;

    signal.update(prevTodos => (
      [
        ...prevTodos, {
        id: uuidV4(),
        title,
        completed: false,
        date: new Date(dueDate),
      }
      ])
    )
  };

  private updateSignalOnToggleComplete(signal: WritableSignal<Todo[]>, todoId: string) {
    signal.update(prevTodos => prevTodos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }

        return todo;
      })
    )
  };

}


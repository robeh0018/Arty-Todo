import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import type {Todo} from "../models";

@Injectable({
  providedIn: 'root'
})
export class TodosStoreService {
  public todos: WritableSignal<Todo[]> = signal<Todo[]>([]);
  public searchedTodos: WritableSignal<Todo[]> = signal<Todo[]>([]);

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

}

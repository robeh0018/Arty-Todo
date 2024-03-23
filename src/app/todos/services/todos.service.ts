import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
// Models
import type {Todo} from "../../models";
// FirestoreDb service.
import {FirestoreTodosService} from "./firestore-todos.service";

@Injectable()
export class TodosService {
  private todos: WritableSignal<Todo[]> = signal<Todo[]>([]);
  private searchedTodos: WritableSignal<Todo[]> = signal<Todo[]>([]);
  // Firestore db service
  private firestoreTodosService = inject(FirestoreTodosService);

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

  public async loadTodosData() {
    const todos = await this.firestoreTodosService.getAllTodos();

    this.todos.set(todos);
  };

  public async addTodo(title: string, dueDate: Date): Promise<void> {

    const todoId = await this.firestoreTodosService.addTodo(title, dueDate);

    if (this.searchedTodosCount() > 0) {
      this.updateSignalOnAddTodo(this.searchedTodos, {title, dueDate, todoId});
    }

    this.updateSignalOnAddTodo(this.todos, {title, dueDate, todoId});
  };

  public async deleteTodo(id: string): Promise<void> {
    await this.firestoreTodosService.deleteTodo(id);

    if (this.searchedTodosCount() > 0) {
      this.searchedTodos.update(searchedTodos => searchedTodos.filter(todo => todo.id !== id));
    }

    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  };

  public async toggleComplete(todoId: string) {

    await this.firestoreTodosService.toggleCompleteTodo(todoId, this.todos())

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
  };

  public resetSearch(): void {
    this.searchedTodos.set([]);
  };


  //  Private methods.
  private updateSignalOnAddTodo(signal: WritableSignal<Todo[]>, fields: {
    title: string,
    dueDate: Date,
    todoId: string
  }): void {
    const {title, dueDate, todoId} = fields;

    signal.update(prevTodos => (
      [
        ...prevTodos, {
        title,
        id: todoId,
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


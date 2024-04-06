import {inject, Injectable, signal, WritableSignal} from '@angular/core';
// Models
import type {Todo} from "../models";
// FirestoreDb service.
import {FirestoreTodosService} from "./firestore-todos.service";
import {TodosStoreService} from "./todos-store.service";

@Injectable({
  providedIn: "root",
})
export class TodosService {

  private todosStoreService = inject(TodosStoreService);
  // Firestore db service
  private firestoreTodosService = inject(FirestoreTodosService);

  private currentUserId: WritableSignal<string> = signal<string>('');

  constructor() {
  }

  public async loadTodosData(currentUserId: string) {
    // Set current user id as global id;
    this.currentUserId.set(currentUserId);

    const todos = await this.firestoreTodosService.getAllTodosByUser(currentUserId);

    this.todosStoreService.todos.set(todos);
  };

  public async addTodo(title: string, dueDate: Date): Promise<void> {

    const todoId = await this.firestoreTodosService.addTodo(title, dueDate, this.currentUserId());

    if (this.todosStoreService.searchedTodosCount() > 0) {
      this.updateSignalOnAddTodo(this.todosStoreService.searchedTodos, {title, dueDate, todoId});
    }

    this.updateSignalOnAddTodo(this.todosStoreService.todos, {title, dueDate, todoId});
  };

  public async deleteTodo(id: string): Promise<void> {
    await this.firestoreTodosService.deleteTodo(id);

    if (this.todosStoreService.searchedTodosCount() > 0) {
      this.todosStoreService.searchedTodos.update(searchedTodos => searchedTodos.filter(todo => todo.id !== id));
    }

    this.todosStoreService.todos.update(todos => todos.filter(todo => todo.id !== id));
  };

  public async toggleComplete(todoId: string) {

    await this.firestoreTodosService.toggleCompleteTodo(todoId, this.todosStoreService.todos())

    if (this.todosStoreService.searchedTodosCount() > 0) {

      this.updateSignalOnToggleComplete(this.todosStoreService.searchedTodos, todoId);
    }

    this.updateSignalOnToggleComplete(this.todosStoreService.todos, todoId);
  };

  public searchTodos(searchValue: string): void {

    this.todosStoreService.searchedTodos.set(this.todosStoreService.todos());

    const searchResult = this.todosStoreService.searchedTodos().filter(
      todo => todo.title.toLowerCase().includes(searchValue.toLowerCase()))

    this.todosStoreService.searchedTodos.set(searchResult);
  };

  public resetSearch(): void {
    this.todosStoreService.searchedTodos.set([]);
  };


  //  Private methods.
  private updateSignalOnAddTodo(signal: WritableSignal<Todo[]>, fields: {
    title: string,
    dueDate: Date,
    todoId: string,
  }): void {
    const {title, dueDate, todoId} = fields;

    signal.update(prevTodos => (
      [
        ...prevTodos, {
        title,
        id: todoId,
        completed: false,
        date: new Date(dueDate),
        userId: this.currentUserId(),
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


import {inject, Injectable} from '@angular/core';
import {FirebaseDb} from "../../firebase.config";
import {addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, updateDoc} from "firebase/firestore";
// Models.
import type {Todo, TodoData, TodosResponse} from "../models";
// Services.
import {SnackBarService} from "../../services";

@Injectable()
export class FirestoreTodosService {

  private snackBarService = inject(SnackBarService);

  public async getAllTodos(): Promise<Todo[]> {
    try {
      const queryConsult = query(collection(FirebaseDb, 'todos'))
      // where('userId', '==', payload));
      const querySnapshot = await getDocs(queryConsult);

      let todos: Todo[] = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        const todoResponse = {
          id: doc.id,
          ...doc.data()
        } as TodosResponse;

        const {date: TimesTampDate, ...rest} = todoResponse;

        todos.push({
            date: TimesTampDate.toDate(),
            ...rest,
          }
        );
      })

      this.snackBarService.showSuccessSnackBar('Todos loaded');

      return todos;
    } catch (e) {

      console.log(e)
      this.snackBarService.showFailSnackBar(`Todos loaded`);
      throw e;
    }
  }


  public async addTodo(title: string, dueDate: Date): Promise<string> {
    try {
      const newTodoData: TodoData = {
        title,
        completed: false,
        date: Timestamp.fromDate(new Date(dueDate)),
      }

      const collectionRef = collection(FirebaseDb, 'todos')

      const {id: docId} = await addDoc(collectionRef, newTodoData);

      this.snackBarService.showSuccessSnackBar('Todo added');

      return docId;
    } catch (e) {

      this.snackBarService.showFailSnackBar('Todo added');

      console.log(e)
      throw e;
    }
  }


  public async deleteTodo(todoId: string): Promise<void> {

    try {
      const docRef = doc(FirebaseDb, 'todos', todoId);

      await deleteDoc(docRef);

      this.snackBarService.showSuccessSnackBar('Todo deleted');
    } catch (e) {

      this.snackBarService.showFailSnackBar('Todo deleted');

      console.log(e)
      throw e;
    }
  }

  public async toggleCompleteTodo(todoId: string, todos: Todo[]): Promise<void> {

    try {
      const todo = todos.find(todo => todo.id === todoId);

      if (!todo) return;

      const docRef = doc(FirebaseDb, 'todos', todoId);

      await updateDoc(docRef, {completed: !todo.completed});
    } catch (e) {

      console.log(e)
      throw e;
    }
  }
}

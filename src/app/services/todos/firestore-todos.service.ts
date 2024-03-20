import {Injectable} from '@angular/core';
import {FirebaseDb} from "../../firebase.config";
import {addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, updateDoc} from "firebase/firestore";
// Models.
import type {Todo, TodoData, TodosResponse} from "../../models";


@Injectable({
  providedIn: 'root'
})
export class FirestoreTodosService {

  constructor() {
  }

  async getAllTodos(): Promise<Todo[]> {
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

      return todos;
    } catch (e) {

      console.log(e)
      throw e;
    }
  }


  async addTodo(title: string, dueDate: Date): Promise<string> {
    try {
      const newTodoData: TodoData = {
        title,
        completed: false,
        date: Timestamp.fromDate(new Date(dueDate)),
      }

      const collectionRef = collection(FirebaseDb, 'todos')

      const {id: docId} = await addDoc(collectionRef, newTodoData);

      return docId;
    } catch (e) {

      console.log(e)
      throw e;
    }
  }


  async deleteTodo(todoId: string): Promise<void> {

    try {
      const docRef = doc(FirebaseDb, 'todos', todoId);

      await deleteDoc(docRef);
    } catch (e) {

      console.log(e)
      throw e;
    }
  }

  async toggleCompleteTodo(todoId: string, todos: Todo[]): Promise<void> {

    try {
      const todo = todos.find( todo => todo.id === todoId);

      if ( !todo ) return;

      const docRef = doc(FirebaseDb, 'todos', todoId);

      await updateDoc(docRef, {completed: !todo.completed});
    } catch (e) {

      console.log(e)
      throw e;
    }
  }
}

import {Routes} from "@angular/router";
import {FirestoreTodosService, TodosService} from "./services";

const todosRoutes: Routes = [
  {
    path: 'todos',
    title: 'Todo List',
    providers: [FirestoreTodosService, TodosService],
    loadComponent: () => import('./pages/todos.page/todos.page.component')
  }
]

export default todosRoutes;

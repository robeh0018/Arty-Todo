import {Routes} from "@angular/router";
import {FirestoreTodosService, TodosService} from "./services";
import {authGuard} from "../auth";

const todosRoutes: Routes = [
  {
    path: 'todos',
    canActivate: [authGuard],
    title: 'Todo List',
    providers: [FirestoreTodosService, TodosService],
    loadComponent: () => import('./pages/todos.page/todos.page.component')
  }
]

export default todosRoutes;

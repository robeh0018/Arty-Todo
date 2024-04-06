import {Routes} from "@angular/router";
import {authGuard} from "../auth";

const todosRoutes: Routes = [
  {
    path: 'todos',
    canActivate: [authGuard],
    title: 'Todo List',
    loadComponent: () => import('./pages/todos.page/todos.page.component')
  }
]

export default todosRoutes;

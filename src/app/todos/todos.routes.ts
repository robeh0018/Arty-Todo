import {Routes} from "@angular/router";

const todosRoutes: Routes = [
  {
    path: 'todos',
    title: 'Todo List',
    loadComponent: () => import('./pages/todos.page/todos.page.component')
  }
]

export default todosRoutes;

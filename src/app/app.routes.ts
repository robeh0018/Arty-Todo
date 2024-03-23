import {Routes} from '@angular/router';
import {FirestoreTodosService, TodosService} from "./todos";

export const routes: Routes = [
  {
    path: 'todos',
    title: 'TodoInterface List',
    providers: [FirestoreTodosService, TodosService],
    loadComponent: () => import('./pages/todos.page/todos.page.component')
  },

  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full',
  }
];

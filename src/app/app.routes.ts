import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    title: 'TodoInterface List',
    loadComponent: () => import('./pages/todos.page/todos.page.component' )
  },

  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full',
  }
];

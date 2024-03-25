import {Routes} from '@angular/router';
import {FirestoreTodosService, TodosService} from "./todos";
import {FirebaseAuthService} from "./auth";

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: '',
    providers: [FirestoreTodosService, TodosService],
    // Todos layout.
    loadComponent: () => import('./todos/pages/todos-layout-page/todos-layout-page.component'),
    // Todos routes.
    loadChildren: () => import('./todos/todos.routes')
  },
  {
    path: 'auth',
    providers: [FirebaseAuthService],
    // Auth routes
    loadChildren: () => import('./auth/auth.routes')
  },

  {
    path: '*',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];

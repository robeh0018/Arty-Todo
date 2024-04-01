import {Routes} from '@angular/router';
import {authGuard, authReAuthenticateGuard} from "./auth";

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: '',
    // Todos layout.
    loadComponent: () => import('./layout/app-layout/app-layout.component'),
    // Todos routes.
    loadChildren: () => import('./todos/todos.routes')
  },
  {
    path: 'auth',
    canActivateChild: [authReAuthenticateGuard],
    // Auth routes
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'users',
    // Auth routes
    canActivate: [authGuard],
    loadComponent: () => import('./layout/app-layout/app-layout.component'),
    loadChildren: () => import('./users/users.routes')
  },
  {
    path: 'not-found',
    title: 'Page 404',
    loadComponent: () => import('./shared/components/page-404/page-404.component'),
  },

  // Make a 404 page.
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
];

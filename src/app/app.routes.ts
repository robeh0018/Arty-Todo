import {Routes} from '@angular/router';
import {authGuard} from "./auth";

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: '',
    // Todos layout.
    canActivate: [authGuard],
    loadComponent: () => import('./layout/app-layout/app-layout.component'),
    // Todos routes.
    loadChildren: () => import('./todos/todos.routes')
  },
  {
    path: 'auth',
    // Auth routes
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'users',
    // Users routes
    canActivate: [authGuard],
    loadComponent: () => import('./layout/app-layout/app-layout.component'),
    loadChildren: () => import('./users/users.routes')
  },
  {
    path: 'not-found',
    title: 'Page 404',
    loadComponent: () => import('./shared/components/page-404/page-404.component'),
  },

  // 404 page.
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
];

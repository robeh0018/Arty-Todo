import {Routes} from "@angular/router";

const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'Sign in',
    loadComponent: () => import('./pages/login-page/login-page.component'),
  },
  {
    path: 'register',
    title: 'New account',
    loadComponent: () => import('./pages/register-page/register-page.component'),
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password',
    loadComponent: () => import('./pages/forgot-password-page/forgot-password-page.component'),
  },
  {
    path: 'new-password',
    title: 'New Password',
    loadComponent: () => import('./pages/new-password-page/new-password-page.component'),
  },
]

export default authRoutes;

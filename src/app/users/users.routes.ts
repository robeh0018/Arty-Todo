import {Routes} from "@angular/router";
import {authAdminGuard} from "../auth";

const usersRoutes: Routes = [
  {
    path: 'user-profile',
    title: 'User profile',
    loadComponent: () => import('./pages/user-profile-page/user-profile-page.component'),
  },
  {
    path: 'new-password',
    title: 'New Password',
    loadComponent: () => import('./pages/user-new-password-page/user-new-password-page.component'),
  },
  {
    path: 'phone-number',
    title: 'Phone number',
    loadComponent: () => import('./pages/user-phone-number/user-phone-number.component'),
  },

  // Should be admin.
  {
    path: 'users-list',
    canActivate: [authAdminGuard],
    title: 'User List',
    loadComponent: () => import('./pages/user-list/user-list.component'),
  },
]

export default usersRoutes;

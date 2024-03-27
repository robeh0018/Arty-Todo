import {Routes} from "@angular/router";

const usersRoutes: Routes = [
  {
    path: 'user-profile',
    title: 'User profile',
    loadComponent: () => import('./pages/user-profile-page/user-profile-page.component'),
  },
  
  // Should be admin.
  {
    path: 'users',
    title: 'User List',
    loadComponent: () => import('./pages/user-profile-page/user-profile-page.component'),
  },
]

export default usersRoutes;

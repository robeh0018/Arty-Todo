import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services";

export const authReAuthenticateGuard: CanActivateChildFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const firebaseUserAuthenticated = await authService.reauthenticateUserIfIsPossible();

  if (firebaseUserAuthenticated) return router.createUrlTree(['/todos']);

  return true;
};

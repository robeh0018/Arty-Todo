import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedUser = authService.getLoggedUser()();

  if (!loggedUser) return router.createUrlTree(['/auth']);

  return true;
};

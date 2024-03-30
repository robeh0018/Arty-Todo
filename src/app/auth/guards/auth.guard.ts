import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthStoreService} from "../services";

export const authGuard: CanActivateFn = (route, state) => {
  const authStoreService = inject(AuthStoreService);
  const router = inject(Router);

  const loggedUser = authStoreService.getLoggedUser()();

  if (!loggedUser) return router.createUrlTree(['/auth']);

  return true;
};

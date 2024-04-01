import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthStoreService} from "../services";

export const authGuard: CanActivateFn = async (route, state) => {
  const authStoreService = inject(AuthStoreService);
  const router = inject(Router);

  // 1. Check userData on auth store.
  const loggedUser = authStoreService.getCurrentUser()();

  if (loggedUser) return true;

  return router.createUrlTree(['/auth']);
};

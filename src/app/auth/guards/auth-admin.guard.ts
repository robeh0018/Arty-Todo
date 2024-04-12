import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthStoreService} from "../services";

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authStoreService = inject(AuthStoreService);

  const user = authStoreService.getCurrentUser()();

  return !!(user && user.role === 'admin');
};

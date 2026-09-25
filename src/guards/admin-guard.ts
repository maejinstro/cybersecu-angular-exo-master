import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth-service/auth-service';

export const adminGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //Vérification du role Admin
  if (authService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
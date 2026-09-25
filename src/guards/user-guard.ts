import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth-service/auth-service';
import { inject } from '@angular/core';


export const userGuard: CanActivateFn = (route) => {

  const auth = inject(AuthService)
  const router = inject(Router)

  const id = Number(route.paramMap.get('id'));

  if(auth.IdUser()===id)return true;
  return router.createUrlTree(['/']);  
};

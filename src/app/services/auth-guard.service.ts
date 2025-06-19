import { AuthService } from './auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();
  if (user) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();
  if (user) {
    debugger
    return router.createUrlTree(['/home']);
  } else {
    debugger
    return true;
  }
};
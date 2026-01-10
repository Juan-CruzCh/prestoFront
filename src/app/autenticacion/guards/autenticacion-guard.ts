import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Login } from '../page/login/login';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  const authService = inject(Login);
  const router = inject(Router);
  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../service/autenticacionService';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService)
  const router = inject(Router);

  if (authService.autenticado()) {
    return true
  }else{
    authService.verificarLogin()
  }
  router.navigate(['/']);
  return false;
};

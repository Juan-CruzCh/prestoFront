import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../service/autenticacionService';
import { tap } from 'rxjs';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService)
  const router = inject(Router);

  if (authService.autenticado()) {
    return true
  }

  return authService.verificarLogin().pipe(tap(isAuth => {
    console.log(isAuth);
    
    if (!isAuth) {
      router.navigate(['/'])
    }

  }));
};

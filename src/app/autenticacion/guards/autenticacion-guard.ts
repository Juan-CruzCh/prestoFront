import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Login } from '../page/login/login';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  
  console.log("guard");
  
  return true;
};

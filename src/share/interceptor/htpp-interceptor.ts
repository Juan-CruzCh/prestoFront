import { HttpInterceptorFn } from '@angular/common/http';

export const htppInterceptor: HttpInterceptorFn = (req, next) => {
  const reqModIficado = req.clone({
    credentials: 'include'
  })
  return next(reqModIficado);
};

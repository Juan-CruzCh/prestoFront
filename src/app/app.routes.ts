import { Routes } from '@angular/router';
import { autenticacionGuard } from './autenticacion/guards/autenticacion-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./autenticacion/autenticacion-module').then(m => m.AutenticacionModule)
  },
  {
    path: 'medidor',
    loadChildren: () => import('./medidor/medidor-module').then(m => m.MedidorModule),
    canActivate: [autenticacionGuard]
  },

  {
    path: 'lectura',
    loadChildren: () => import('./lectura/lectura-module').then(m => m.LecturaModule),
    canActivate: [autenticacionGuard]
  },

  {
    path: 'pago',
    loadChildren: () => import('./pago/pago-module').then(m => m.PagoModule),
    canActivate: [autenticacionGuard]
  },

  {
    path: 'tarifa',
    loadChildren: () => import('./tarifa/tarifa-module').then(m => m.TarifaModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario-module').then(m => m.UsuarioModule),
    canActivate: [autenticacionGuard]
  },
];

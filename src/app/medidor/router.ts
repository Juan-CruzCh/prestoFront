import { Routes } from '@angular/router';
import { CrearMedidor } from './page/crear-medidor/crear-medidor';
import { Listar } from './page/listar/listar';
import { MedidorMoroso } from './page/medidor-moroso/medidor-moroso';

export const router: Routes = [
  {
    path: 'crear',
    component: CrearMedidor,
  },
  {
    path: 'listar',
    component: Listar,
  },
  {
    path: 'moroso',
    component: MedidorMoroso,
  },
];

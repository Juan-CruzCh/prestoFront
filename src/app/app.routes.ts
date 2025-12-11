import { Routes } from '@angular/router';

export const routes: Routes = [     
    {
        path: 'medidor',
        loadChildren: () => import('./medidor/medidor-module').then(m => m.MedidorModule)
    },

     {
        path: 'lectura',
        loadChildren: () => import('./lectura/lectura-module').then(m => m.LecturaModule)
    },

      {
        path: 'pago',
        loadChildren: () => import('./pago/pago-module').then(m => m.PagoModule)
    },

     {
        path: 'tarifa',
        loadChildren: () => import('./tarifa/tarifa-module').then(m => m.TarifaModule)
    },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario-module').then(m => m.UsuarioModule)
    }
];

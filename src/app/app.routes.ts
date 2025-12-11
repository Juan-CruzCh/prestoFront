import { Routes } from '@angular/router';

export const routes: Routes = [     
    {
        path: 'medidor',
        loadChildren: () => import('./medidor/medidor-module').then(m => m.MedidorModule)
    }];

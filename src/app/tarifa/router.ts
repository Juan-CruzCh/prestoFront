import { Routes } from "@angular/router";
import { Listar } from "./page/listar/listar";
import { Crear } from "./page/crear/crear";

export const router: Routes = [
    {
        path:'listar',
        component:Listar,

    },
    {
        path:'crear',
        component:Crear,
        
    }
];

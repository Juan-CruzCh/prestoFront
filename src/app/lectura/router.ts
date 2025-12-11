import { Routes } from "@angular/router";
import { Listar } from "./page/listar/listar";
import { RealizarLectura } from "./page/realizar-lectura/realizar-lectura";

export const router: Routes = [
    {
        path: "realizar",
        component: RealizarLectura
    },
     {
        path: "listar",
        component: Listar
    }
]
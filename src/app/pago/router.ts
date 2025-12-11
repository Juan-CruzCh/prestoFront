import { Routes } from "@angular/router";
import { RealizarPago } from "./page/realizar-pago/realizar-pago";
import { Listar } from "./page/listar/listar";

export const router: Routes = [
    {
        path: "realizar",
        component: RealizarPago
    },
     {
        path: "listar",
        component: Listar
    }
]
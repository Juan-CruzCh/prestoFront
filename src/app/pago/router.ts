import { Routes } from "@angular/router";
import { RealizarPago } from "./page/realizar-pago/realizar-pago";
import { Listar } from "./page/listar/listar";
import { DetallePago } from "./page/detalle-pago/detalle-pago";

export const router: Routes = [
    {
        path: "realizar",
        component: RealizarPago
    },
     {
        path: "listar",
        component: Listar
    },
    {
        path: "detalle/:id",
        component: DetallePago
    }
]
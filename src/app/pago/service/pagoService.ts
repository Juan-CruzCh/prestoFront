import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { buscarMedidorClienteI, ListarPagos, PagoDetalleResponse } from "../model/pago";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PagoService {
    private apiUrl = 'http://localhost:5000/api';
    constructor(
        private readonly http: HttpClient,

    ) { }

    buscarMedidorCliente (idClinte: string):Observable<buscarMedidorClienteI[]>{
        return this.http.get<buscarMedidorClienteI[]>(`${this.apiUrl}/lectura/medidor/cliente/${idClinte}`)
    }
    

    realizarPago(lecturas:string[], cliente:string, medidor:string){
      return this.http.post(`${this.apiUrl}/pago`, {cliente:cliente, medidor:medidor,lecturas:lecturas.map((item)=> ({lectura:item}))})
    }   
    
     detallePago(pago:string):Observable<PagoDetalleResponse>{ 
      return this.http.get<PagoDetalleResponse>(`${this.apiUrl}/pago/detalle/${pago}`)
    } 

    listarPagos():Observable<ListarPagos[]>{ 
      return this.http.get<ListarPagos[]>(`${this.apiUrl}/pago`)
    } 
}   
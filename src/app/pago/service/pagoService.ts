import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { buscarMedidorClienteI } from "../model/pago";
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
    

    realizarPago(lecturas:string[]){
        console.log( {lecturas:lecturas});
        
      return this.http.post(`${this.apiUrl}/pago`, {lecturas:lecturas.map((item)=> ({lectura:item}))})
    }   
    
}   
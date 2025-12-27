import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { buscarMedidorClienteI, ListarPagos, PagoDetalleResponse } from "../model/pago";
import { Observable } from "rxjs";
import { ResultadoHttp } from "../../../share/model/ResultadoHttp";

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

    listarPagos(
      codigoCliente:string,
      ci:string,
      nombre:string,
      apellidoMaterno:string,
      apellidoPaterno:string,
      numeroMedidor:string,
      fechaInicio:string,
      fechaFin:string
    ):Observable<ResultadoHttp<ListarPagos>>{ 
      return this.http.get<ResultadoHttp<ListarPagos>>(`${this.apiUrl}/pago`, {
        params:{
          codigoCliente,
          ci,
          nombre,
          apellidoMaterno,
          apellidoPaterno,
          numeroMedidor,
          fechaInicio,
          fechaFin
        }
      })
    } 
}   
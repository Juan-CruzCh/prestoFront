import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuscarMedidorClienteI, DetalleLecturasResponse, FormularioLecturaI, ListarLecturaMedidorI } from '../model/lectura';

@Injectable({
  providedIn: 'root',
})
export class lecturaService {
  private apiUrl = 'http://localhost:5000/api';
  constructor(private readonly http: HttpClient) { }

  buscarMedidorCliente(numeroMedidor: string): Observable<BuscarMedidorClienteI> {
    return this.http.get<BuscarMedidorClienteI>(`${this.apiUrl}/lectura/medidor/${numeroMedidor}`)
  }

  registrarLectura(data: FormularioLecturaI): Observable<any> {
    console.log(data);
    
    return this.http.post(`${this.apiUrl}/lectura`, data)
  }

  listarLecturas(fechaInicio: string, fechaFin: string): Observable<ListarLecturaMedidorI[]> {
   
    return this.http.post<ListarLecturaMedidorI[]>(`${this.apiUrl}/lectura/listar`,{
      fechaInicio,
      fechaFin
    })
  }

   detalleLectura(medidor: string, lectura: string): Observable<DetalleLecturasResponse> {
    return this.http.get<DetalleLecturasResponse>(`${this.apiUrl}/lectura/detalle/${medidor}/${lectura}`)
  }

}

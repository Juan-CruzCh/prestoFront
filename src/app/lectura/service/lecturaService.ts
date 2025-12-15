import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoHttp } from '../../../share/model/ResultadoHttp';
import { BuscarMedidorClienteI, FormularioLecturaI } from '../model/lectura';

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
    return this.http.post(`${this.apiUrl}/lectura`, data)
  }
  listarLecturas(codigo: string, fehaInicio: string, fechaFin: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/lectura/listar`, {
      codigo,
      fehaInicio,
      fechaFin
    })
  }

}

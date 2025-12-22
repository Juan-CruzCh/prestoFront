import { Injectable } from '@angular/core';
import { ListarTarifasI, ListarTarifasRangoI, TarifaI } from '../model/tarifa';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { firstValueFrom, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarifasService {
  private apiUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) { }
  crearTarifa(data: TarifaI): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tarifa`, data);
  }

  listarTarifasRangos(): Observable<ListarTarifasRangoI[]> {
    return this.http.get<ListarTarifasRangoI[]>(`${this.apiUrl}/tarifa/rangos`).pipe((res) => res)


  }


  listarTarifas(): Observable<ListarTarifasI[]> {
    return this.http.get<ListarTarifasI[]>(`${this.apiUrl}/tarifa`).pipe((res) => res)


  }
}

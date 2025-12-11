import { Injectable } from '@angular/core';
import { ListarTarifasRangoI, TarifaI } from '../model/tarifa';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarifasService {
  private apiUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) {}

  async crearTarifa(data: TarifaI): Promise<HttpResponse<any>> {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(`${this.apiUrl}/api/tarifa`, data, { observe: 'response' })
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async listarTaridas(): Promise<ListarTarifasRangoI[] | null> {
    try {
      const response = await firstValueFrom(
        this.http.get<ListarTarifasRangoI[]>(`${this.apiUrl}/api/tarifa/rangos`, { observe: 'response' })
      );

      return response.body;
    } catch (error) {
      throw error;
    }
  }
}

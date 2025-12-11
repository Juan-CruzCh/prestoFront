import { Injectable } from '@angular/core';
import { TarifaI } from '../model/tarifa';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarifasService {
  private apiUrl = 'http://localhost:5000/api/tarifa';
  constructor(private http: HttpClient) {}

  async crearTarifa(data: any): Promise<HttpResponse<any>> {
    const response = await firstValueFrom(
      this.http.post<any>(this.apiUrl, data, { observe: 'response' })
    );
    return response;
  }
}

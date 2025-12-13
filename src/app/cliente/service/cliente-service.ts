import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListarClienteI } from '../model/cliente';
import { Observable } from 'rxjs';
import { ResultadoHttp } from '../../../share/model/ResultadoHttp';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:5000/api';
  constructor(private readonly http: HttpClient) { }

  listarClientes(
    codigo: string,
    ci: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    pagina: number
  ): Observable<ResultadoHttp<ListarClienteI>> {

    return this.http.get<ResultadoHttp<ListarClienteI>>(`${this.apiUrl}/cliente`, {
      params: {
        codigo,
        ci,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        pagina
      }
    }).pipe((res) => res)

  }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearClienteI, ListarClienteI } from '../model/cliente';
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

  crearCliente(data: CrearClienteI): Observable<ListarClienteI> {
    return this.http.post<ListarClienteI>(`${this.apiUrl}/cliente`, data)

  }

   eliminarCliente(id:string): Observable<ListarClienteI> {
    return this.http.delete<ListarClienteI>(`${this.apiUrl}/cliente/${id}`)

  }


}

import { HttpBackend, HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TarifasService } from "../../tarifa/service/TarifasService";
import { FormularioMedidorI, ListarMedidorClientesI } from "../model/medidor";
import { Observable } from "rxjs";
import { ResultadoHttp } from "../../../share/model/ResultadoHttp";

@Injectable({
    providedIn: 'root',
})
export class MedidorService {
    private apiUrl = 'http://localhost:5000/api';
    constructor(
        private readonly http: HttpClient,

    ) { }

    crearMedidor(data: FormularioMedidorI): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/medidor`, data, { observe: "response" });
    }

    listarMedidorCliente(codigo: string,
        ci: string, nombre: string,
        apellidoPaterno: string,
        apellidoMaterno: string,
        numeroMedidor: string,
        tarifa: string,
        estado: string,
        estadoMedidor: string

    ): Observable<ResultadoHttp<ListarMedidorClientesI>> {
        return this.http.get<ResultadoHttp<ListarMedidorClientesI>>(`${this.apiUrl}/medidor`, {
            params: {
                codigo,
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                numeroMedidor,
                ci,
                tarifa,
                estado,
                estadoMedidor
            }
        }).pipe((res) => res);
    }
}   
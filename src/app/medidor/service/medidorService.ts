import { HttpClient } from "@angular/common/http";
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

    crearMedidor(data: FormularioMedidorI) {
        return this.http.post<any>(`${this.apiUrl}/medidor`, data, { observe: 'response' });
    }

    listarMedidorCliente(): Observable<ResultadoHttp<ListarMedidorClientesI>> {
        return this.http.get<ResultadoHttp<ListarMedidorClientesI>>(`${this.apiUrl}/medidor`).pipe((res) => res);
    }
}   
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsuarioListarI } from "../model/usuario";

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private apiUrl = 'http://localhost:5000/api';
    constructor(
        private readonly http: HttpClient,

    ) { }
    

    listarUsuarios():Observable<UsuarioListarI[]>{
        return this.http.get<UsuarioListarI[]>(`${this.apiUrl}/usuario`)

    }
}
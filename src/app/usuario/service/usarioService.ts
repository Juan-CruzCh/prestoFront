import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private apiUrl = 'http://localhost:5000/api';
    constructor(
        private readonly http: HttpClient,

    ) { }
    

}
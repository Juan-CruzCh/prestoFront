
import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  autenticado = signal<boolean>(false)

  private apiUrl = 'http://localhost:5000/api';
  constructor(private readonly http: HttpClient) { }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/autenticacion`, {
      password,
      usuario
    })
  }

  verificarLogin() {
    this.autenticado.set(true)
  }

}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  private apiUrl = 'http://localhost:5000/api';
  constructor(private readonly http: HttpClient) { }

  login(usuario:string, password:string ): Observable<any> {    
    return this.http.post<any>(`${this.apiUrl}/autenticacion`, {
        password,
        usuario
    })
  }

}
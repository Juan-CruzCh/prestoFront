
import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";

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
 verificarLogin(): Observable<boolean> {  
  return this.http.get<any>(`${this.apiUrl}/verificar/autenticacion`).pipe(
    map((value) => {      
      this.autenticado.set(true);
      return true;
    }),
    catchError((err) => {  
      console.log(err);
          
      this.autenticado.set(false);
      return of(false);
    })
  );
}


serrarSession(): Observable<boolean> {  
  return this.http.get<any>(`${this.apiUrl}/cerrarSession`)
   
}


}

import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { UpdateUsuarioI } from "../../usuario/model/usuario";

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  autenticado = signal<boolean>(false)
   usuario= signal<UpdateUsuarioI>({
      apellidoMaterno:'',
      apellidoPaterno:'',
      celular:'',
      ci:'',
      direccion:'',
      nombre:'',
      rol:'',
      usuario:''
    })
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
      this.usuario.set(value)
      return true;
    }),
    catchError((err) => {  
      console.log(err);
          
      this.autenticado.set(false);
      return of(false);
    })
  );
}
  getIsAutenticado(){
    return this.autenticado()
  }

  getUsuaurioLogeado(){
    return this.usuario()
  }

serrarSession(): Observable<boolean> {  
  return this.http.get<any>(`${this.apiUrl}/cerrarSession`)
   
}


}
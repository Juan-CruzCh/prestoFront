import { Component, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
import { AutenticacionService } from '../../service/autenticacionService';


interface usuarioI {
  usuario: string
  password: string
}



@Component({
  selector: 'app-login',
  imports: [Field],
  templateUrl: './login.html',
})
export class Login {
  private isAutenticacion: boolean = false
  error:string = ''
  formUsuario = signal<usuarioI>({
    password: '',
    usuario: ''
  })


  form = form(this.formUsuario, (field) => {
    required(field.usuario, { message: "El usuario es obligatorio" })
    required(field.password, { message: "La contraseña es obligatoria" })
  })

constructor(private readonly autenticacionService:AutenticacionService){}

  public isLongin() {
    return this.isAutenticacion
  }

  btnSudmint(e:Event){
    e.preventDefault()
    
    this.autenticacionService.login(this.form().value().usuario,this.form().value().password).subscribe(
      {
        next:(value)=> {
          console.log(value);
          
        },
        error:(err)=> {
          this.error = err.error.mensaje
 
          
        },
      }
    )

    
    
  }




}

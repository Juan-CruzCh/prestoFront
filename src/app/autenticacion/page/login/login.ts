import { Component, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
import { AutenticacionService } from '../../service/autenticacionService';
import { Router } from '@angular/router';

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
  error = signal<string>('')
  formUsuario = signal<usuarioI>({
    password: '',
    usuario: ''
  })


  form = form(this.formUsuario, (field) => {
    required(field.usuario, { message: "El usuario es obligatorio" })
    required(field.password, { message: "La contraseña es obligatoria" })
  })

  constructor(
    private readonly autenticacionService: AutenticacionService,
  private readonly router: Router
  ) { }

  btnSudmint(e: Event) {
    e.preventDefault()

    this.autenticacionService.login(this.form().value().usuario, this.form().value().password).subscribe(
      {
        next: (value) => {
          if (value.token) {
            this.autenticacionService.verificarLogin()
              this.router.navigate(['/inicio'])
          }

        },
        error: (err) => {

          this.error.set(err.error.mensaje)


        },
      }
    )



  }





}

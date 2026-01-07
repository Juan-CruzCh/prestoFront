import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioCrearI } from '../../model/usuario';
import { UsuarioService } from '../../service/usarioService';
import { RefrescarService } from '../../../../share/service/refrescarService';
import { Field, form, required } from '@angular/forms/signals';

@Component({
  selector: 'app-crear-usuario',
  imports: [Field],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css',
})
export class CrearUsuario {
  isOpen: boolean = false

  private readonly cliente = signal<UsuarioCrearI>({
    apellidoMaterno: '',
    apellidoPaterno: '',
    celular: '',
    ci: '',
    nombre: '',
    direccion: '',
    password: '',
    rol: '',
    usuario: ''
  })

  form = form(this.cliente, (field) => {
    required(field.ci, { message: "El CI es obligatorio" })
    required(field.nombre, { message: "El nombre es obligatorio" })
    required(field.apellidoPaterno, { message: "El apellido paterno es obligatorio" })
    required(field.apellidoMaterno, { message: "El apellido materno es obligatorio" })
    required(field.celular, { message: "El celular es obligatorio" })
    required(field.direccion, { message: "La dirección es obligatoria" })
    required(field.usuario, { message: "El usuario es obligatorio" })
    required(field.password, { message: "La contraseña es obligatoria" })
    required(field.rol, { message: "El rol es obligatorio" })
  })


  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly refrescarService: RefrescarService
  ) { }
  abrirModal() {
    this.form().setControlValue({
      apellidoMaterno: '',
      apellidoPaterno: '',
      celular: '',
      ci: '',
      nombre: '',
      direccion: '',
      password: '',
      rol: '',
      usuario: ''
    })
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
  }

  guardarUsuario(e: Event) {
    e.preventDefault()
    this.usuarioService.crearUsuarios(this.form().value()).subscribe({
      next: (value) => {
          this.refrescarService.triggerRefrescar()
      this.cerrarModal()
      },
      error(err) {
        console.log(err);

      },
    })



  }

}

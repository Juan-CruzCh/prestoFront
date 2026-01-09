import { Component, signal } from '@angular/core';
import { UsuarioCrearI } from '../../model/usuario';
import { UsuarioService } from '../../service/usarioService';
import { RefrescarService } from '../../../../share/service/refrescarService';
import { Field, form, required } from '@angular/forms/signals';
import { usuarioSchema } from '../../validate/usuarioSchema';

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

  form = form(this.cliente, usuarioSchema)


  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly refrescarService: RefrescarService
  ) { }

  abrirModal() {
    this.form().reset()
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

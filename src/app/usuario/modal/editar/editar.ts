import { Component, signal } from '@angular/core';
import { UpdateUsuarioI, UsuarioCrearI, UsuarioListarI } from '../../model/usuario';
import { updateusuarioSchema, usuarioSchema } from '../../validate/usuarioSchema';
import { Field, form } from '@angular/forms/signals';
import { UsuarioService } from '../../service/usarioService';
import { RefrescarService } from '../../../../share/service/refrescarService';
import { error } from '../../../../share/utils/alertas';

@Component({
  selector: 'app-editar',
  imports: [Field],
  templateUrl: './editar.html'
})
export class Editar {
  isOpen: boolean = false
  idUsuario = ''
  private readonly cliente = signal<UpdateUsuarioI>({
    apellidoMaterno: '',
    apellidoPaterno: '',
    celular: '',
    ci: '',
    nombre: '',
    direccion: '',
    rol: '',
    usuario: ''
  })


  form = form(this.cliente, updateusuarioSchema)
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly refrescarService: RefrescarService
  ) { }

  cerrarModal() {
    this.isOpen = false;
  }

  setUsuario(usuario: UsuarioListarI) {
    this.form().setControlValue({
      apellidoMaterno: usuario.apellidoMaterno,
      apellidoPaterno: usuario.apellidoPaterno,
      celular: usuario.celular,
      ci: usuario.ci,
      direccion: usuario.direccion,
      nombre: usuario.nombre,
      rol: usuario.rol,
      usuario: usuario.usuario,
    })
    this.idUsuario = usuario._id
    this.isOpen = true;
  }


  editarUsuario(e: Event) {
    e.preventDefault()
    this.usuarioService.actualizar(this.idUsuario, this.form().value()).subscribe({
      next: (value) => {
        this.refrescarService.triggerRefrescar()
        this.cerrarModal()
      },
      error(err) {
        error(err.error.mensaje)

      },
    })



  }

}

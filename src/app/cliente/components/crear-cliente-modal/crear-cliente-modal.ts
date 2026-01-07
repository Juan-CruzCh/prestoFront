import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CrearClienteI, ListarClienteI } from '../../model/cliente';
import { ClienteService } from '../../service/cliente-service';
import { RefrescarService } from '../../../../share/service/refrescarService';
import { error } from '../../../../share/utils/alertas';
import { Field, form, required } from '@angular/forms/signals'

@Component({
  selector: 'app-crear-cliente-modal',
  imports: [Field],
  standalone: true,
  templateUrl: './crear-cliente-modal.html',
})
export class CrearClienteModal {
  isOpen = false;
  @Output() private clienteSeleccionado = new EventEmitter<ListarClienteI>()
  private readonly cliente = signal<CrearClienteI>({
    apellidoMaterno: '',
    apellidoPaterno: '',
    celular: '',
    ci: '',
    nombre: ''
  })

  form = form(this.cliente, (field) => {
    required(field.ci, { message: "El ci es obligatorio" })
    required(field.nombre, { message: "El nombre es obligatorio" })
    required(field.apellidoPaterno, { message: "El   apellido paterno es obligatorio" })
    required(field.apellidoMaterno, { message: "El   apellido materno es obligatorio" })
    required(field.celular, { message: "El    celular es obligatorio" })
  })
  constructor(private readonly clienteService: ClienteService, private readonly refrescarService: RefrescarService) { }

  btnGuardar(e: Event) {
    e.preventDefault()
    this.clienteService.crearCliente(this.form().value()).subscribe({
      next: (value) => {
        this.clienteSeleccionado.emit(value)
        this.cerrarModal()
        this.refrescarService.triggerRefrescar()
      },
      error: (err) => {

        error(err.error.mensaje)

      },
    },

    )

  }




  abrirModal() {
    this.form().reset({
      apellidoMaterno: '',
      apellidoPaterno: '',
      celular: '',
      ci: '',
      nombre: ''
    })
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
  }


}

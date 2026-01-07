import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearClienteI, ListarClienteI } from '../../model/cliente';
import { ClienteService } from '../../service/cliente-service';
import { RefrescarService } from '../../../../share/service/refrescarService';
import { error } from '../../../../share/utils/alertas';
import { form, required, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-editar',
  imports: [Field],
  templateUrl: './editar.html',

})
export class Editar {
  idCliente: string = ''
  isOpen = false;
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
  abrirModal() {
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
  }

  editarCliente(cliente: ListarClienteI) {
    this.form().setControlValue({
      ci: cliente.ci,
      apellidoMaterno: cliente.apellidoMaterno,
      apellidoPaterno: cliente.apellidoPaterno,
      celular: cliente.celular,
      nombre: cliente.nombre
    })
    this.idCliente = cliente._id
    this.isOpen = true;
  }

  guardarCliente(e: Event) {
    e.preventDefault()
    this.clienteService.editarCliente(this.form().value(), this.idCliente).subscribe({
      next: (value) => {
        this.cerrarModal()
        this.refrescarService.triggerRefrescar()
      },
      error(err) {
        error(err.error.mensaje)
      },
    },
    )
  }
}

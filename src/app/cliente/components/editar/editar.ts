import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearClienteI, ListarClienteI } from '../../model/cliente';
import { ClienteService } from '../../service/cliente-service';
import { RefrescarService } from '../../../../share/service/refrescarService';
import { error } from '../../../../share/utils/alertas';

@Component({
  selector: 'app-editar',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar.html',

})
export class Editar {

  idCliente: string = ''
  isOpen = false;

  clienteForm = new FormGroup({
    ci: new FormControl('', { nonNullable: true, validators: Validators.required }),
    nombre: new FormControl('', { nonNullable: true, validators: Validators.required }),
    celular: new FormControl('', { nonNullable: true, validators: Validators.required }),
    apellidoPaterno: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    apellidoMaterno: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

  });
  constructor(private readonly clienteService: ClienteService, private readonly refrescarService: RefrescarService) { }
  abrirModal() {
    this.clienteForm.reset()
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
  }

  editarCliente(cliente: ListarClienteI) {
    this.clienteForm.patchValue({
      ci: cliente.ci,
      nombre: cliente.nombre,
      celular: cliente.celular,
      apellidoPaterno: cliente.apellidoPaterno,
      apellidoMaterno: cliente.apellidoMaterno,
    });
    this.idCliente = cliente._id
    this.isOpen = true;
  }

  guardarCliente() {
    if (this.clienteForm.invalid) {

      this.clienteForm.markAllAsTouched();
      return;
    }
    let data: CrearClienteI = {
      nombre: this.clienteForm.controls.nombre.value,
      apellidoPaterno: this.clienteForm.controls.apellidoPaterno.value,
      apellidoMaterno: this.clienteForm.controls.apellidoMaterno.value,
      celular: this.clienteForm.controls.celular.value,
      ci: this.clienteForm.controls.ci.value,

    }
    this.clienteService.editarCliente(data, this.idCliente).subscribe({
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

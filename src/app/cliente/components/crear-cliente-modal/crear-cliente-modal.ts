import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearClienteI, ListarClienteI } from '../../model/cliente';
import { ClienteService } from '../../service/cliente-service';

@Component({
  selector: 'app-crear-cliente-modal',
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './crear-cliente-modal.html',
  styleUrl: './crear-cliente-modal.css',
})
export class CrearClienteModal {
  isOpen = false;
  @Output() private clienteSeleccionado = new EventEmitter<ListarClienteI>()


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

  constructor(private readonly clienteService: ClienteService) { }
  abrirModal() {
    this.clienteForm.reset()
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
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
    this.clienteService.crearCliente(data).subscribe({
      next: (value) => {
        this.clienteSeleccionado.emit(value)
        this.cerrarModal()
      },
      error(err) {
        console.log(err);

      },
    },

    )
  }
}

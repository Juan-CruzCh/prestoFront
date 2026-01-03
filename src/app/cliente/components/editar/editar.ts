import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearClienteI } from '../../model/cliente';
import { ClienteService } from '../../service/cliente-service';
import { RefrescarService } from '../../../../share/service/refrescarService';

@Component({
  selector: 'app-editar',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar.html',
 
})
export class Editar {
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
   
          this.cerrarModal()
          this.refrescarService.triggerRefrescar()
        },
        error(err) {
          console.log(err);
  
        },
      },
  
      )
    }
}

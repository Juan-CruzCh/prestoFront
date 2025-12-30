import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioCrearI } from '../../model/usuario';
import { UsuarioService } from '../../service/usarioService';
import { RefrescarService } from '../../../../share/service/refrescarService';

@Component({
  selector: 'app-crear-usuario',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css',
})
export class CrearUsuario {
  isOpen: boolean = false
  usuarioForm = new FormGroup({
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
    usuario: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
    direccion: new FormControl('', { nonNullable: true, validators: Validators.required }),
    rol: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly refrescarService: RefrescarService
  ) { }
  abrirModal() {
    this.usuarioForm.reset()
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
  }

  guardarUsuario() {
    
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }
    var data: UsuarioCrearI = {
      ci: this.usuarioForm.controls.ci.value,
      nombre: this.usuarioForm.controls.nombre.value,
      apellidoPaterno: this.usuarioForm.controls.apellidoPaterno.value,
      apellidoMaterno: this.usuarioForm.controls.apellidoMaterno.value,
      celular: this.usuarioForm.controls.celular.value,
      direccion: this.usuarioForm.controls.direccion.value,
      password: this.usuarioForm.controls.password.value,
      rol: this.usuarioForm.controls.rol.value,
      usuario: this.usuarioForm.controls.usuario.value
    }
    console.log(data);
    
    this.usuarioService.crearUsuarios(data).subscribe({
      next:(value)=> {
        console.log(value);
        
        this.refrescarService.triggerRefrescar()
        this.cerrarModal()
      },
      error(err) {
        console.log(err);
        
      },
    })



  }

}

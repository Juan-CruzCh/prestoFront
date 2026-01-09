import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Observable, single } from 'rxjs';
import { UsuarioService } from '../../service/usarioService';
import { CommonModule } from '@angular/common';
import { UsuarioListarI } from '../../model/usuario';
import { CrearUsuario } from "../../modal/crear-usuario/crear-usuario";
import { RefrescarService } from '../../../../share/service/refrescarService';
import { confirmarEliminar, error } from '../../../../share/utils/alertas';
import { Editar } from '../../modal/editar/editar';

@Component({
  selector: 'app-listar-usuario',
  imports: [CommonModule, CrearUsuario, Editar],
  templateUrl: './listar-usuario.html',
  styleUrl: './listar-usuario.css',
})
export class ListarUsuario implements OnInit {
  usuarios = signal<UsuarioListarI[]>([])
  @ViewChild('editarModal') editarModal!: Editar;
  constructor(private readonly usuarioService: UsuarioService, private readonly refrescarService: RefrescarService) { }


  ngOnInit(): void {
    this.listar()
    this.refrescarService.refrescar$.subscribe(() => this.listar())

  }

  listar() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (value) => {
        this.usuarios.set(value)
      },
    })
  }

  async btnEliminar(usuario: UsuarioListarI) {
    const confirmar = await confirmarEliminar(usuario.nombre)
    if (!confirmar) return

    this.usuarioService.eliminar(usuario._id).subscribe({
      next: (value) => {
        this.listar()
      },
      error(err) {
        
        error(err.error.mensaje) 
      },
    })

  }
  btnEditar(usuario: UsuarioListarI){
    this.editarModal.setUsuario(usuario)
  }
}

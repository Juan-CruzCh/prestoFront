import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../service/usarioService';
import { CommonModule } from '@angular/common';
import { UsuarioListarI } from '../../model/usuario';
import { CrearUsuario } from "../../modal/crear-usuario/crear-usuario";
import { RefrescarService } from '../../../../share/service/refrescarService';

@Component({
  selector: 'app-listar-usuario',
  imports: [CommonModule, CrearUsuario],
  templateUrl: './listar-usuario.html',
  styleUrl: './listar-usuario.css',
})
export class ListarUsuario implements OnInit {
  usuarios$!: Observable<UsuarioListarI[]>

  constructor(private readonly usuarioService: UsuarioService, private readonly refrescarService: RefrescarService) { }


  ngOnInit(): void {
    this.listar()
    this.refrescarService.refrescar$.subscribe(() => this.listar())

  }

  listar() {
    this.usuarios$ = this.usuarioService.listarUsuarios()
  }


}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../service/usarioService';
import { CommonModule } from '@angular/common';
import { UsuarioListarI } from '../../model/usuario';

@Component({
  selector: 'app-listar-usuario',
  imports: [CommonModule],
  templateUrl: './listar-usuario.html',
  styleUrl: './listar-usuario.css',
})
export class ListarUsuario implements OnInit {
  usuarios$!:Observable<UsuarioListarI[]>

  constructor(private readonly usuarioService: UsuarioService){}


  ngOnInit(): void {
      this.usuarios$=this.usuarioService.listarUsuarios()

  }


}

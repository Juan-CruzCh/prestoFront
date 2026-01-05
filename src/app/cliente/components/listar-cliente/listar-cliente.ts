import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, output, ViewChild } from '@angular/core';
import { ClienteService } from '../../service/cliente-service';
import { map, Observable } from 'rxjs';
import { ListarClienteI } from '../../model/cliente';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultadoHttp } from '../../../../share/model/ResultadoHttp';
import { PageEvent } from '@angular/material/paginator';
import { RefrescarService } from '../../../../share/service/refrescarService';
import { MatIconModule } from "@angular/material/icon";
import { AlertUtils } from '../../../../share/utils/alertas';
import { Editar } from '../editar/editar';
@Component({
  selector: 'app-listar-cliente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatPaginatorModule, MatIconModule, Editar],
  standalone: true,
  templateUrl: './listar-cliente.html',
})
export class ListarCliente implements OnInit {
  paginas: number = 0
  totalClientes: number = 0;
  maxVisiblePages: number = 7;
  codigo: string = '';
  ci: string = '';
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  pagina: number = 1
  clientes: ListarClienteI[] = [];
  @Output() private clienteSeleccionado = new EventEmitter<ListarClienteI>()
  @ViewChild('editarModal') editarModal!: Editar;

  constructor(private readonly clienteService: ClienteService,
     private readonly cdr: ChangeDetectorRef,
      private readonly refrescarService: RefrescarService,

    ) { }
  ngOnInit(): void {
    this.listarClientes()
    this.refrescarService.refrescar$.subscribe(() => this.listarClientes())
  }

  listarClientes() {

    this.clienteService.listarClientes(this.codigo,
      this.ci,
      this.nombre,
      this.apellidoPaterno,
      this.apellidoMaterno,
      this.pagina
    ).pipe(
      map((res: ResultadoHttp<ListarClienteI>) => {
        this.paginas = res.paginas;
        this.totalClientes = res.total;
        return res.data;
      })
    ).subscribe(
      {
        next: (value) => {
          this.clientes = value
          this.cdr.detectChanges()
        },
      }
    );

  }

  onPageChange(event: PageEvent) {
    this.pagina = event.pageIndex + 1;
    this.listarClientes();
  }

  radioButtonSeleccionarCliente(cliente: ListarClienteI) {
    this.clienteSeleccionado.emit(cliente)
  }

  async eliminar(cliente: ListarClienteI) {
    let confirmacion = await AlertUtils.confirmarEliminar(cliente.nombre)
    if (!confirmacion) return
    this.clienteService.eliminarCliente(cliente._id).subscribe({
      next: (value) => {
        this.refrescarService.triggerRefrescar()
      },
      error(err) {
        AlertUtils.error("Ocurrio un erro al eliminar el usuario")
      },
    })
  }


  async actualizar(cliente: ListarClienteI) {
   this.editarModal.editarCliente(cliente);

  }

}

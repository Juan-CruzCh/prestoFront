import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, output, signal } from '@angular/core';
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
@Component({
  selector: 'app-listar-cliente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatPaginatorModule, MatIconModule],
  standalone: true,
  templateUrl: './listar-cliente.html',
})
export class ListarCliente implements OnInit {
  maxVisiblePages: number = 7;
  codigo: string = '';
  ci: string = '';
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';

  pagina = signal(1);
  totalClientes = signal(0);
  paginas = signal(0);
  clientes = signal<ListarClienteI[]>([]);
  @Output() private clienteSeleccionado = new EventEmitter<ListarClienteI>()


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
      this.pagina()
    ).pipe(
      map((res: ResultadoHttp<ListarClienteI>) => {
        this.paginas.set(res.paginas);
        this.totalClientes.set(res.total);
        return res.data;
      })
    ).subscribe(
      {
        next: (value) => {
          this.clientes.set(value)

        },
      }
    );

  }

  onPageChange(event: PageEvent) {
    this.pagina.set(event.pageIndex + 1);
    this.listarClientes();
  }

  radioButtonSeleccionarCliente(cliente: ListarClienteI) {
    this.clienteSeleccionado.emit(cliente)
  }

  async eliminar(cliente: ListarClienteI) {
    const confirmacion = await AlertUtils.confirmarEliminar(cliente.nombre);
    if (!confirmacion) return;

    this.clienteService.eliminarCliente(cliente._id).subscribe({
      next: () => {
        this.listarClientes();
      },
      error: () => {
        AlertUtils.error('Ocurrió un error al eliminar el usuario');
      }
    });
  }

  async actualizar(cliente: ListarClienteI) {


  }

}

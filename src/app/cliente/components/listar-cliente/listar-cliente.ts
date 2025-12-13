import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { ClienteService } from '../../service/cliente-service';
import { map, Observable } from 'rxjs';
import { ListarClienteI } from '../../model/cliente';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultadoHttp } from '../../../../share/model/ResultadoHttp';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-listar-cliente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatPaginatorModule],
  standalone: true,
  templateUrl: './listar-cliente.html',
})
export class ListarCliente implements OnInit {
  clientes$!: Observable<ListarClienteI[]>
  paginas: number = 0
  totalClientes: number = 0;
  maxVisiblePages: number = 7;
  codigo: string = '';
  ci: string = '';
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  pagina: number = 1

  @Output() private clienteSeleccionado = new EventEmitter<ListarClienteI>()


  constructor(private readonly clienteService: ClienteService) { }
  ngOnInit(): void {
    this.listarClientes()
  }

  listarClientes() {
    console.log(this.pagina);
    
    this.clientes$ = this.clienteService.listarClientes(this.codigo,
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
    );
  }

 onPageChange(event: PageEvent) {
  this.pagina = event.pageIndex + 1;
  this.listarClientes();
}

  radioButtonSeleccionarCliente(cliente: ListarClienteI) {
    this.clienteSeleccionado.emit(cliente)

  }

}

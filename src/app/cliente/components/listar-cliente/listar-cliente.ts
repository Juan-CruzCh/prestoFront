import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../service/cliente-service';
import { map, Observable } from 'rxjs';
import { ListarClienteI } from '../../model/cliente';
import { ResultadoHttp } from '../../../share/model/ResultadoHttp';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-cliente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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


  constructor(private readonly clienteService: ClienteService) { }
  ngOnInit(): void {
    this.listarClientes()
  }

  listarClientes() {
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

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina < 1 || nuevaPagina > this.paginas) return;
    this.pagina = nuevaPagina;
    this.listarClientes(); // vuelve a cargar los datos con la nueva página
  }


  get paginasVisibles(): number[] {
    const paginasArray: number[] = [];
    let start = Math.max(1, this.pagina - Math.floor(this.maxVisiblePages / 2));
    let end = Math.min(this.paginas, start + this.maxVisiblePages - 1);

    // ajustar start si llegamos al final
    start = Math.max(1, end - this.maxVisiblePages + 1);

    for (let i = start; i <= end; i++) {
      paginasArray.push(i);
    }

    return paginasArray;
  }
  radioButtonSeleccionarCliente(cliente: ListarClienteI) {
    console.log(cliente);

  }

}

import { Component, OnInit } from '@angular/core';
import { MedidorService } from '../../service/medidorService';
import { map, Observable } from 'rxjs';
import { ListarMedidorClientesI } from '../../model/medidor';
import { ResultadoHttp } from '../../../../share/model/ResultadoHttp';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar',
  imports: [CommonModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {
  listarMedidorClientes$!: Observable<ListarMedidorClientesI[]>
  paginas: number = 0
  pagina: number = 1
  maxVisiblePages = 7
  constructor(private readonly medidorService: MedidorService) {

  }

  ngOnInit(): void {
    this.listarMedidorCliente()
  }

  listarMedidorCliente() {
    this.listarMedidorClientes$ = this.medidorService.listarMedidorCliente().pipe(
      map((item: ResultadoHttp<ListarMedidorClientesI>) => {
        this.paginas
        return item.data

      })
    )

  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina < 1 || nuevaPagina > this.paginas) return;
    this.pagina = nuevaPagina;
    this.listarMedidorCliente(); // vuelve a cargar los datos con la nueva página
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

}

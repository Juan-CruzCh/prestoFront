import { Component, OnInit } from '@angular/core';
import { MedidorService } from '../../service/medidorService';
import { map, Observable } from 'rxjs';
import { ListarMedidorClientesI } from '../../model/medidor';
import { ResultadoHttp } from '../../../../share/model/ResultadoHttp';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listar',
  imports: [CommonModule,MatPaginatorModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {
  listarMedidorClientes$!: Observable<ListarMedidorClientesI[]>
  paginas: number = 0
  pagina: number = 1
  totalMedidores = 0
  constructor(private readonly medidorService: MedidorService) {

  }

  ngOnInit(): void {
    this.listarMedidorCliente()
  }

  listarMedidorCliente() {
    this.listarMedidorClientes$ = this.medidorService.listarMedidorCliente().pipe(
      map((item: ResultadoHttp<ListarMedidorClientesI>) => {
        this.paginas = item.paginas
        this.totalMedidores = item.total
        return item.data

      })
    )

  }

  
  onPageChange(event: PageEvent) {
    this.pagina = event.pageIndex + 1;
    this.listarMedidorCliente();
  }


}

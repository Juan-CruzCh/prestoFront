import { Component, OnInit } from '@angular/core';
import { MedidorService } from '../../service/medidorService';
import { map, Observable } from 'rxjs';
import { ListarMedidorClientesI } from '../../model/medidor';
import { ResultadoHttp } from '../../../../share/model/ResultadoHttp';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarTarifasI } from '../../../tarifa/model/tarifa';
import { TarifasService } from '../../../tarifa/service/TarifasService';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, MatPaginatorModule, FormsModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {
  listarMedidorClientes$!: Observable<ListarMedidorClientesI[]>
  paginas: number = 0
  pagina: number = 1
  totalMedidores = 0
  tarifas$!: Observable<ListarTarifasI[]>;
  codigo: string = '';
  ci: string = '';
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  direccion: string = ""
  numeroMedidor: string = ""
  tarifa: string = ""
  estado: string = ""
  constructor(
    private readonly medidorService: MedidorService,
    private readonly tariFaService: TarifasService
  ) {

  }

  ngOnInit(): void {
    this.listarMedidorCliente()
    this.tarifas$ = this.tariFaService.listarTarifas();
  }

  listarMedidorCliente() {
    this.listarMedidorClientes$ = this.medidorService.listarMedidorCliente(
      this.codigo,
      this.ci,
      this.nombre,
      this.apellidoPaterno,
      this.apellidoMaterno,
      this.numeroMedidor,
      this.tarifa,
      this.estado
    ).pipe(
      map((item: ResultadoHttp<ListarMedidorClientesI>) => {
        this.paginas = item.paginas
        this.totalMedidores = item.total
        return item.data

      })
    )

  }

  btnBuscar() {
    this.pagina = 1;
    this.listarMedidorCliente();
  }


  onPageChange(event: PageEvent) {
    this.pagina = event.pageIndex + 1;
    this.listarMedidorCliente();
  }


}

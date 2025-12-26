import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PagoService } from '../../service/pagoService';
import { map, Observable } from 'rxjs';
import { ListarPagos } from '../../model/pago';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, RouterModule, MatPaginatorModule],
  templateUrl: './listar.html'
})
export class Listar implements OnInit {
  paginas: number = 0
  totalClientes: number = 0;
  maxVisiblePages: number = 7;
  codigo: string = '';
  ci: string = '';
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  pagina: number = 1
  fechaInicio: string = ""
  fechaFin: string = ""
  listarPagos$!: Observable<ListarPagos[]>
  constructor(private readonly pagoService: PagoService, private router: Router) { }

  ngOnInit(): void {
     const hoy = new Date()
    hoy.setHours(hoy.getHours() - 4)
    this.fechaInicio = hoy.toISOString().split('T')[0];
    this.fechaFin = hoy.toISOString().split('T')[0];
    this.listarPagos();
  }

  listarPagos() {
    this.listarPagos$ = this.pagoService.listarPagos().pipe(map((item) => {
      this.paginas = item.paginas

      return item.data
    }))
  }

  onPageChange(event: PageEvent) {
    this.pagina = event.pageIndex + 1;
    this.listarPagos();
  }

} 

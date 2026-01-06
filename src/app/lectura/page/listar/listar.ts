import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListarLecturaMedidorI } from '../../model/lectura';
import { lecturaService } from '../../service/lecturaService';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";
import { confirmarEliminar, error } from '../../../../share/utils/alertas';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, MatPaginatorModule, FormsModule, RouterModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {
  listarLecturas = signal<ListarLecturaMedidorI[]>([])
  pagina: number = 0
  fechaInicio: string = ""
  fechaFin: string = ""
  totalPaginas: number = 200

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly lecturaService: lecturaService) { }

  ngOnInit(): void {
    const hoy = new Date()
    hoy.setHours(hoy.getHours() - 4)
    this.fechaInicio = hoy.toISOString().split('T')[0];
    this.fechaFin = hoy.toISOString().split('T')[0];
    this.listarLecturasRegistradas()
  }

  listarLecturasRegistradas() {
    this.lecturaService.listarLecturas(this.fechaInicio, this.fechaFin).pipe(map((item) => {
      this.totalPaginas = Math.ceil((item.length / 20))
      // this.totalLecturas + item.length
      return item
    })).subscribe({
      next: (value) => {
        this.listarLecturas.set(value)
      },
    })
  }
  onPageChange(event: PageEvent) {
    this.pagina = event.pageIndex + 1;
    this.listarLecturasRegistradas();
  }

  async eliminar(lectura: ListarLecturaMedidorI) {
    const confirmacion = await confirmarEliminar(lectura.numeroMedidor)
    if (!confirmacion) return
    this.lecturaService.eliminar(lectura._id).subscribe({
      next: (value) => {
        this.listarLecturasRegistradas()
      },
      error(err) {
        error(err.error.mensaje)
      },
    })
  }
}

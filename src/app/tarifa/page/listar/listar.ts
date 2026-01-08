import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TarifasService } from '../../service/TarifasService';
import { ListarTarifasRangoI, TarifaRango } from '../../model/tarifa';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { confirmarEliminar } from '../../../../share/utils/alertas';
import { RefrescarService } from '../../../../share/service/refrescarService';

@Component({
  selector: 'app-listar',
  imports: [CommonModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {
  tarifas = signal<ListarTarifasRangoI[]>([]);
  constructor(
    private router: Router,
    private readonly tarifasService: TarifasService,
    private readonly refrescarService: RefrescarService,
  ) { }

  ngOnInit() {
    this.listar();
  }

  irCrearTarifa() {
    this.router.navigate(['/tarifa/crear']);
  }

  listar() {
    this.tarifasService.listarTarifasRangos().subscribe({
      next: (value) => {
        this.tarifas.set(value)
      },
    });
  }

  async eliminarTarifa(tarifa: ListarTarifasRangoI) {
    const confirmar = await confirmarEliminar(tarifa.nombre)
    if (!confirmar) return
    this.tarifasService.eliminarTarifa(tarifa._id).subscribe({
      next: (value) => {
        if (value.MatchedCount > 0) {
          this.listar()
        }

      },
    })
  }

  async eliminarRango(rango: TarifaRango) {
    const confirmar = await confirmarEliminar()
    if (!confirmar) return
    this.tarifasService.eliminarTarifa(rango._id).subscribe({
      next: (value) => {
        console.log(value);
        
        if (value.MatchedCount > 0) {
          this.listar()
        }

      },
    })
  }
}

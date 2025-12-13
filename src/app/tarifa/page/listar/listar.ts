import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarifasService } from '../../service/TarifasService';
import { ListarTarifasRangoI } from '../../model/tarifa';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar',
  imports: [CommonModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {
  tarifas$!: Observable<ListarTarifasRangoI[]>;
  constructor(private router: Router, private readonly tarifasService: TarifasService) { }

  ngOnInit() {
    this.listar();
  }

  irCrearTarifa() {
    this.router.navigate(['/tarifa/crear']);
  }

  listar() {
    try {
      this.tarifas$ = this.tarifasService.listarTarifasRangos();
    } catch (error) {
      console.log(error);
    }
  }
}

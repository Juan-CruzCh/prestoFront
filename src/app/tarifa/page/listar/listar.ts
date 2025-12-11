import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarifasService } from '../../service/TarifasService';
import { ListarTarifasRangoI } from '../../model/tarifa';

@Component({
  selector: 'app-listar',
  imports: [],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {
  tarifas: ListarTarifasRangoI[] = [];
  constructor(private router: Router, private readonly tarifasService: TarifasService) {}

  ngOnInit() {
    this.listar();
  }

  irCrearTarifa() {
    this.router.navigate(['/tarifa/crear']);
  }

  async listar() {
    try {
      const response = await this.tarifasService.listarTaridas();

      if (response && response.length > 0) {
        this.tarifas = [...response];
        console.log(this.tarifas);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

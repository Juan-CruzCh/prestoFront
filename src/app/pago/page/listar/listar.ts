import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PagoService } from '../../service/pagoService';
import { Observable } from 'rxjs';
import { ListarPagos } from '../../model/pago';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.html'
})
export class Listar implements OnInit  {
  listarPagos$!:Observable<ListarPagos[]>
  constructor(private readonly pagoService: PagoService, private router: Router) { }

  ngOnInit(): void {
    this.listarPagos$ = this.pagoService.listarPagos()
  }
} 

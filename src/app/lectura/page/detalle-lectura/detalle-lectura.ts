import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lecturaService } from '../../service/lecturaService';
import { map, Observable } from 'rxjs';
import { DetalleLecturasResponse } from '../../model/lectura';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-lectura',
  imports: [CommonModule],
  templateUrl: './detalle-lectura.html',
  styleUrl: './detalle-lectura.css',
})
export class DetalleLectura implements OnInit {
  medidor = ''
  lectura = ''
  detalleLectura$!: Observable<DetalleLecturasResponse>
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly lecturaService: lecturaService,

  ) { }

  ngOnInit(): void {
    this.medidor = this.activatedRoute.snapshot.paramMap.get('medidor') ?? ''
    this.lectura = this.activatedRoute.snapshot.paramMap.get('lectura') ?? ''
    this.detalleLectura()
  }

  detalleLectura() {
    this.detalleLectura$ = this.lecturaService.detalleLectura(this.medidor, this.lectura).pipe(map((item) => {
      item.lecturas = item.lecturas.sort((a, b) =>   a.numeroLectura -b.numeroLectura )  
      item.totalApagar = item.lecturas.filter((item)=> item.estado == 'PENDIENTE').reduce((acc, item)=>acc + item.costoApagar, 0)
      return item
    }))
  }

}

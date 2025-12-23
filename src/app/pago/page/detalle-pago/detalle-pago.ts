import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PagoService } from '../../service/pagoService';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PagoDetalleResponse } from '../../model/pago';
import { CommonModule } from '@angular/common';
import { numeroATextoBolivianos } from '../../../../share/utils/numeroTexto';

@Component({
  selector: 'app-detalle-pago',
  imports: [CommonModule],
  templateUrl: './detalle-pago.html',
  styleUrl: './detalle-pago.css',
})
export class DetallePago implements OnInit {
  totalPagado: number = 0
  totalTexto: string = ''
  detallePago$!: Observable<PagoDetalleResponse>
  @ViewChild('recibo') recibo!: ElementRef;
  constructor(
    private readonly pagoService: PagoService,
    private readonly activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.detallePago$ = this.pagoService.detallePago(id).pipe(map((item) => {
        this.totalPagado = item.detallePago.detallePago.reduce((acc, i) => acc + i.costoPagado, 0)
        console.log( this.totalPagado);
        
         this.totalTexto= numeroATextoBolivianos(this.totalPagado)
        return item
      }))
    }

  }

  imprimirRecibo() {
    const printContents = this.recibo.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // recarga para que Angular reactive los bindings
  }


}

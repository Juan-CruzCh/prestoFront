import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PagoService } from '../../service/pagoService';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-detalle-pago',
  imports: [],
  templateUrl: './detalle-pago.html',
  styleUrl: './detalle-pago.css',
})
export class DetallePago implements OnInit {

  detallePago$!:Observable<any>
  @ViewChild('recibo') recibo!: ElementRef;
    constructor(private readonly pagoService: PagoService) { }

    

    ngOnInit(): void {
     this.detallePago$= this.pagoService.detallePago("69498ff90727d984104aae2c")
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

import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-detalle-pago',
  imports: [],
  templateUrl: './detalle-pago.html',
  styleUrl: './detalle-pago.css',
})
export class DetallePago {
  @ViewChild('recibo') recibo!: ElementRef;

  imprimirRecibo() {
    const printContents = this.recibo.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // recarga para que Angular reactive los bindings
  }
}

import { Component } from '@angular/core';
import { ListarCliente } from "../../../cliente/components/listar-cliente/listar-cliente";
import { ListarClienteI } from '../../../cliente/model/cliente';
import { Observable, raceWith } from 'rxjs';
import { buscarMedidorClienteI } from '../../model/pago';
import { PagoService } from '../../service/pagoService';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { advertencia, confirmarPago, error } from '../../../../share/utils/alertas';

@Component({
  selector: 'app-realizar-pago',
  imports: [ListarCliente, CommonModule],
  templateUrl: './realizar-pago.html'
})
export class RealizarPago {
  medidorSeleccionado: string = '';
  total: number = 0
  lecturasCliente$!: Observable<buscarMedidorClienteI[]>
  lecturaSeleccionas: string[] = []
  meses: string[] = []
  cliente: string = ''
  idMedidor: string = ''
  idCliente: string = ''
  constructor(private readonly pagoService: PagoService, private router: Router) { }
  getCliente(cliente: ListarClienteI) {
    this.lecturasCliente$ = this.pagoService.buscarMedidorCliente(cliente._id)
    this.medidorSeleccionado = ''
    this.idCliente = cliente._id
    this.cliente = `${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`

  }

  btnMedidor(numeroMedidor: string) {
    if (this.medidorSeleccionado !== numeroMedidor) {
      this.medidorSeleccionado = numeroMedidor;
      this.total = 0;
      this.lecturaSeleccionas = [];
      this.meses = []
    }

  }

  btnLectura(event: Event, id: string, monto: number, meses: string, idMedidor: string) {
    const checked = (event.target as HTMLInputElement).checked;
    this.idMedidor = idMedidor
    if (checked) {
      this.total += monto;
      this.lecturaSeleccionas.push(id);
      this.meses.push(meses)
    } else {
      this.total -= monto;
      this.lecturaSeleccionas = this.lecturaSeleccionas.filter(l => l !== id);
    }

  }


  async btnRealizarPago() {
    if (this.lecturaSeleccionas.length <= 0) {
      advertencia("Debe seleccionar al menos una lectura")
      return
    }
    const confirmacion = await confirmarPago(this.cliente, this.meses, this.total)
    if (!confirmacion) return
    this.pagoService.realizarPago(this.lecturaSeleccionas, this.idCliente, this.idMedidor).subscribe({
      next: (value) => {
        this.router.navigate(['/pago/detalle', value]);
      },
      error(err) {
        error("Ocuccio un error")

      },
    })

  }

}

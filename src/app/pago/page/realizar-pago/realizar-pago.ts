import { Component } from '@angular/core';
import { ListarCliente } from "../../../cliente/components/listar-cliente/listar-cliente";
import { ListarClienteI } from '../../../cliente/model/cliente';
import { Observable } from 'rxjs';
import { buscarMedidorClienteI } from '../../model/pago';
import { PagoService } from '../../service/pagoService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realizar-pago',
  imports: [ListarCliente, CommonModule],
  templateUrl: './realizar-pago.html'
})
export class RealizarPago {

  lecturasCliente$!:Observable<buscarMedidorClienteI[]>

  constructor(private readonly pagoService:PagoService){}
  getCliente(cliente: ListarClienteI) {
    console.log('hola');
    
    this.lecturasCliente$ =  this.pagoService.buscarMedidorCliente(cliente._id)
  
  }


}

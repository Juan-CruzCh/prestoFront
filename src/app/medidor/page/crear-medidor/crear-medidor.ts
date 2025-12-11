import { Component } from '@angular/core';
import { ClienteModule } from "../../../cliente/cliente-module";
import { ListarCliente } from '../../../cliente/components/listar-cliente/listar-cliente';

@Component({
  selector: 'app-crear-medidor',
  standalone: true,
  imports: [ClienteModule, ListarCliente],
  templateUrl: './crear-medidor.html'
})
export class CrearMedidor {

}

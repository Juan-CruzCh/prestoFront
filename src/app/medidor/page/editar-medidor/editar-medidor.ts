import { Component, OnInit, signal } from '@angular/core';
import { MedidorService } from '../../service/medidorService';
import { TarifasService } from '../../../tarifa/service/TarifasService';
import { ListarTarifasI } from '../../../tarifa/model/tarifa';
import { Observable } from 'rxjs';
import { FormularioMedidorI } from '../../model/medidor';
import { Field, form } from '@angular/forms/signals';
import { MedidorSchema } from '../../validate/medidorSchema';
import { ListarCliente } from "../../../cliente/components/listar-cliente/listar-cliente";
import { CrearClienteModal } from "../../../cliente/components/crear-cliente-modal/crear-cliente-modal";
import { ListarClienteI } from '../../../cliente/model/cliente';
import { CommonModule } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-editar-medidor',
  imports: [ListarCliente, CrearClienteModal, Field, CommonModule],
  templateUrl: './editar-medidor.html',
})
export class EditarMedidor implements OnInit {
  nombre: string = '';
  ci: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  codigo: string = '';
  idClinte: string = '';
  idMedidor: string = '';

  tarifas$!: Observable<ListarTarifasI[]>;
  private readonly medidor = signal<FormularioMedidorI>({
    cliente: '',
    descripcion: '',
    direccion: '',
    fechaInstalacion: '',
    numeroMedidor: '',
    tarifa: ''
  })


  readonly form = form(this.medidor, MedidorSchema);



  constructor(
    private readonly medidorService: MedidorService,
    private readonly tariFaService: TarifasService,
    private readonly snackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.obtenerMeiddorPorId(id)
    }

    this.tarifas$ = this.tariFaService.listarTarifas();
  }

  getCliente(cliente: ListarClienteI) {
    this.ci = cliente.ci;
    this.nombre = cliente.nombre;
    this.apellidoPaterno = cliente.apellidoPaterno;
    this.apellidoMaterno = cliente.apellidoMaterno;
    this.codigo = cliente.codigo;
    this.idClinte = cliente._id;
  }

  btnEditarMedidor(e: Event) {
    e.preventDefault()
    const data = this.form().value();

    if (data.fechaInstalacion) {
      data.fechaInstalacion = new Date(data.fechaInstalacion).toISOString();
    }
    if (this.idClinte) {
      data.cliente = this.idClinte
    }

    this.medidorService.editarMedidor(data, this.idMedidor).subscribe({
      next: (res) => {
      console.log(res);
      
      },
      error: (err) => {
        console.log(err);


      },
    });
  }

  obtenerMeiddorPorId(id: string) {
    this.medidorService.obtenerMedidorPorid(id).subscribe({
      next: (value) => {
        this.nombre = value[0].nombre
        this.ci = value[0].ci
        this.apellidoPaterno = value[0].apellidoPaterno
        this.apellidoMaterno = value[0].apellidoMaterno
        this.codigo = value[0].codigoCliente
        this.idClinte = value[0].idCliente
        this.idMedidor = value[0]._id
        this.form().setControlValue({
          descripcion: value[0].descripcion,
          direccion: value[0].descripcion,
          cliente: value[0].idCliente,
          fechaInstalacion: value[0].fechaInstalacion,
          numeroMedidor: value[0].numeroMedidor,
          tarifa: value[0].tarifa
        })
      },
      error(err) {
        console.log(err);

      },
    })
  }
}

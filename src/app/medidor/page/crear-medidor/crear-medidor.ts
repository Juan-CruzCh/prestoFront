import { Component, OnInit, signal } from '@angular/core';
import { ClienteModule } from '../../../cliente/cliente-module';
import { ListarCliente } from '../../../cliente/components/listar-cliente/listar-cliente';
import { ListarClienteI } from '../../../cliente/model/cliente';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioMedidorI } from '../../model/medidor';
import { TarifasService } from '../../../tarifa/service/TarifasService';
import { Observable, of } from 'rxjs';
import { ListarTarifasI } from '../../../tarifa/model/tarifa';
import { MedidorService } from '../../service/medidorService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatusCode } from '@angular/common/http';
import { CrearClienteModal } from "../../../cliente/components/crear-cliente-modal/crear-cliente-modal";
import { Field, form, required } from '@angular/forms/signals';
import { MedidorSchema } from '../../validate/medidorSchema';
@Component({
  selector: 'app-crear-medidor',
  standalone: true,
  imports: [ClienteModule, ListarCliente, CommonModule, Field, CrearClienteModal],
  templateUrl: './crear-medidor.html',
  styleUrls: ['./crear.css'],

})
export class CrearMedidor implements OnInit {
  nombre: string = '';
  ci: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  codigo: string = '';
  idClinte: string = '';
  tarifas$!: Observable<ListarTarifasI[]>;

  private readonly medidor = signal<FormularioMedidorI>({
    cliente: '',
    descripcion: '',
    direccion: '',
    fechaInstalacion: new Date(),
    numeroMedidor: '',
    tarifa: ''
  })


  readonly form = form(this.medidor, MedidorSchema);



  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly tariFaService: TarifasService,
    private readonly medidorService: MedidorService
  ) { }

  ngOnInit(): void {
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

  btnRegistrarMedidor(e: Event) {
    e.preventDefault()
    const data = this.form().value();

    if (data.fechaInstalacion) {
      data.fechaInstalacion = new Date(data.fechaInstalacion);
    }
    if (this.idClinte) {
      data.cliente = this.idClinte
    }

    this.medidorService.crearMedidor(data).subscribe({
      next: (res) => {
        if (res.status === HttpStatusCode.Created) {
          this.form().reset()
          this.snackBar.open('Medidor registrado correctamente', 'Cerrar', {
            duration: 4000,
            panelClass: 'snack-success',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      },
      error: (err) => {
        console.log(err);

        this.snackBar.open(err.error.error, 'cerrar', {
          duration: 4000,
          panelClass: 'snack-error',
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

      },
    });
  }
}

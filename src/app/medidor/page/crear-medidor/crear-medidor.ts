import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-crear-medidor',
  standalone: true,
  imports: [ClienteModule, ListarCliente, CommonModule, ReactiveFormsModule],
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

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly tariFaService: TarifasService,
    private readonly medidorService: MedidorService
  ) {}

  ngOnInit(): void {
    this.tarifas$ = this.tariFaService.listarTarifas();
  }
  medidorForm = new FormGroup({
    numeroMedidor: new FormControl('', { nonNullable: true, validators: Validators.required }),
    descripcion: new FormControl(''),
    tarifa: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    direccion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fechaInstalacion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  getCliente(cliente: ListarClienteI) {
    this.ci = cliente.ci;
    this.nombre = cliente.nombre;
    this.apellidoPaterno = cliente.apellidoPaterno;
    this.apellidoMaterno = cliente.apellidoMaterno;
    this.codigo = cliente.codigo;
    this.idClinte = cliente._id;
  }

  btnRegistrarMedidor() {
    if (this.medidorForm.invalid) {
      this.medidorForm.markAllAsTouched();
      return;
    }
    const data: FormularioMedidorI = {
      numeroMedidor: this.medidorForm.controls.numeroMedidor.value,
      descripcion: this.medidorForm.controls.descripcion.value ?? '',
      fechaInstalacion: new Date(this.medidorForm.controls.fechaInstalacion.value).toISOString(),
      tarifa: this.medidorForm.controls.tarifa.value,
      direccion: this.medidorForm.controls.direccion.value,
      cliente: this.idClinte,
    };
    this.medidorService.crearMedidor(data).subscribe({
      next: (res) => {
        if (res.status === HttpStatusCode.Created) {
          this.medidorForm.reset()
          this.snackBar.open('Medidor registrado correctamente', 'Cerrar', {
            duration: 4000,
            panelClass: 'snack-success',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      },
      error: (err) => {
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

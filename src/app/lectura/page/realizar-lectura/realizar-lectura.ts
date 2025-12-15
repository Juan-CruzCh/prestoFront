import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { lecturaService } from '../../service/lecturaService';
import { BuscarMedidorClienteI, FormularioLecturaI } from '../../model/lectura';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-realizar-lectura',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true,
  templateUrl: './realizar-lectura.html',
  styleUrl: './realizar-lectura.css',
})
export class RealizarLectura implements OnInit {
  lecturaCliente: BuscarMedidorClienteI = {}
  mesesAno: string[] = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
  ];
  gestiones: number[] = []
  mes: string = ""
  numeroMedidor = ""
  lecturaActual = 0
  error: string = ""
  gestion: string = ""

  formularioLectura = new FormGroup({

    lecturaActual: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    lecturaAnterior: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),

  })

  constructor(
    private readonly lecturaService: lecturaService,
    private cdr: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
    const date = new Date()
    const mesActualIndex = date.getMonth();
    this.mes = this.mesesAno[mesActualIndex];
    this.gestion = date.getFullYear().toString()
    for (let i = 0; i <= 2; i++) {
      this.gestiones.push(date.getFullYear() - i);
    }
  }

  buscarMedidor() {
    this.lecturaService.buscarMedidorCliente(this.numeroMedidor).subscribe(
      {
        next: (value) => {
          this.error = ""
          this.lecturaCliente = value
          this.cdr.detectChanges()

        },
        error: (err) => {
          this.error = err.error.error
          this.cdr.detectChanges()
        }
      }
    )
  }

  btnRegistrarLectura() {

    if (this.formularioLectura.invalid) {
      this.formularioLectura.markAllAsTouched();
      return;
    }
    console.log(this.lecturaCliente.medidor, this.gestion, this.mes)
    console.log(this.formularioLectura.value, this.formularioLectura.controls.lecturaActual.value);
    if (this.lecturaCliente.medidor && this.gestion && this.mes) {
      const data: FormularioLecturaI = {
        gestion: this.gestion,
        medidor: this.lecturaCliente.medidor,
        lecturaActual: Number(this.formularioLectura.controls.lecturaActual.value),
        lecturaAnterior: Number(this.formularioLectura.controls.lecturaAnterior.value),
        mes: this.mes
      }


      this.lecturaService.registrarLectura(data).subscribe({
        next: (value) => {
          this.snackBar.open("registrado", 'cerrar', {
            duration: 4000,
            panelClass: 'snack-error',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });


        },
        error: (err) => {
          this.snackBar.open(err.error.error, 'cerrar', {
            duration: 4000,
            panelClass: 'snack-error',
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      })

    } else {
      this.snackBar.open("Ingresa todos los campos", 'cerrar', {
        duration: 4000,
        panelClass: 'snack-error',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }

  }
}

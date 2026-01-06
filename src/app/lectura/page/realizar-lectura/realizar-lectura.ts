import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { lecturaService } from '../../service/lecturaService';
import { BuscarMedidorClienteI, FormularioLecturaI } from '../../model/lectura';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AlertUtils } from '../../../../share/utils/alertas';

@Component({
  selector: 'app-realizar-lectura',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true,
  templateUrl: './realizar-lectura.html',
  styleUrl: './realizar-lectura.css',
})
export class RealizarLectura implements OnInit {
  lecturaCliente = signal<BuscarMedidorClienteI>({})
  mesesAno: string[] = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
  ];
  gestiones: number[] = []
  mes: string = ""
  numeroMedidor = ""
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
    private readonly router: Router
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
          this.lecturaCliente.set(value)
          this.formularioLectura.patchValue({
            lecturaAnterior: value.lecturaActual
          })


        },
        error: (err) => {
          this.error = err.error.error

        }
      }
    )
  }

  btnRegistrarLectura() {

    if (this.formularioLectura.invalid) {
      this.formularioLectura.markAllAsTouched();
      return;
    }

    if (this.lecturaCliente().medidor && this.gestion && this.mes) {
      const data: FormularioLecturaI = {
        gestion: Number(this.gestion),
        medidor: this.lecturaCliente().medidor ?? "",
        lecturaActual: Number(this.formularioLectura.controls.lecturaActual.value),
        lecturaAnterior: Number(this.formularioLectura.controls.lecturaAnterior.value),
        mes: this.mes
      }
      this.lecturaService.registrarLectura(data).subscribe({
        next: (value) => {
          this.router.navigate(['/lectura/detalle', value.medidor, value.lectura]);

        },
        error: (err) => {
          AlertUtils.error(err.error.mensaje)
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

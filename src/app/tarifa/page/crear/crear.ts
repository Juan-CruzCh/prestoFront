import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularioRango, TarifaI } from '../../model/tarifa';
import { TarifasService } from '../../service/TarifasService';
@Component({
  selector: 'app-crear',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear.html',
})
export class Crear {
  constructor(private readonly tarifasService: TarifasService) {}

  tarifas: FormularioRango[] = [];
  tarifaForm = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: Validators.required }),
    rango1: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    rango2: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    costo: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    iva: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  btnRegistrarTarifa() {
    if (this.tarifaForm.invalid) {
      this.tarifaForm.markAllAsTouched();
      return;
    }
    const data: FormularioRango = {
      nombre: this.tarifaForm.controls.nombre.value,
      rango1: this.tarifaForm.controls.rango1.value,
      rango2: this.tarifaForm.controls.rango2.value,
      costo: this.tarifaForm.controls.costo.value,
      iva: this.tarifaForm.controls.iva.value,
    };
    this.tarifas.push(data);
  }
  btnEliminarTarifa(index: number) {
    this.tarifas = this.tarifas.filter((_, i) => i !== index);
  }
   btnGuardarTarifa() {
    const data: TarifaI = {
      nombre: this.tarifas[0].nombre.toUpperCase(),
      rango: this.tarifas.map((item) => ({
        costo: item.costo,
        iva: item.iva,
        rango1: item.rango1,
        rango2: item.rango2,
      })),
    };

    this.tarifasService.crearTarifa(data).subscribe({
      next(value) {
        console.log(value);
        
      },
      error(err) {
        console.log(err);
        
      },
    })
    
  }
}

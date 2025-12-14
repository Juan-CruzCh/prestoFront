import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-realizar-lectura',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './realizar-lectura.html',
  styleUrl: './realizar-lectura.css',
})
export class RealizarLectura implements OnInit {
  mesesAno: string[] = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
  ];
  mes: string = ""


  ngOnInit(): void {
    const mesActualIndex = new Date().getMonth(); // 0 = Enero
    this.mes = this.mesesAno[mesActualIndex];
  }
}

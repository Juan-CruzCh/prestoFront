import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar',
  imports: [],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {

  fechaInicio: string = ""
  fechaFin: string = ""
  ngOnInit(): void {
    const hoy = new Date()
    hoy.setHours(hoy.getHours() - 4)
    this.fechaInicio = hoy.toISOString().split('T')[0];
    this.fechaFin = hoy.toISOString().split('T')[0];
    this.listarLecturas()
  }

  listarLecturas() {
    
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  imports: [],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar {
constructor(private router: Router) {}
  irCrearTarifa(){
    this.router.navigate(["/tarifa/crear"])
    
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { router } from './router';
import { ClienteModule } from '../cliente/cliente-module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    
    ClienteModule,
  ]
})
export class MedidorModule { }

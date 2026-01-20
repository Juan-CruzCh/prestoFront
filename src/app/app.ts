import { Component, effect, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from './autenticacion/service/autenticacionService';
import { UpdateUsuarioI } from './usuario/model/usuario';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, CommonModule],
  templateUrl: './app.html',
  standalone: true
})
export class App {
  protected readonly title = signal('Sistema de agua');
  usuario= signal<UpdateUsuarioI>({
    apellidoMaterno:'',
    apellidoPaterno:'',
    celular:'',
    ci:'',
    direccion:'',
    nombre:'',
    rol:'',
    usuario:''
  })
  isAutenticacion = signal(false);

  constructor(private readonly autenticacionService: AutenticacionService, private readonly router :Router) {

    effect(() => {
      this.isAutenticacion.set(this.autenticacionService.getIsAutenticado());
      this.usuario.set(this.autenticacionService.getUsuaurioLogeado())
    });

    this.autenticacionService.verificarLogin()

  }



  drawerOpen = false;


  expandedMenus: { [key: string]: boolean } = {
    medidor: false,
    lecturas: false,
    tarifa: false,
    gastos: false,
    pagos: false
  };


  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleSubmenu(menu: string) {

    this.expandedMenus[menu] = !this.expandedMenus[menu];
  }

  serraSession(){
    this.autenticacionService.serrarSession().subscribe({
      next:()=>{
        this.isAutenticacion.set(false)
        this.router.navigate(['/'])
      },
      error:(err) =>{
        this.isAutenticacion.set(false)
          this.router.navigate(['/'])
      },
      
    })
  }
}

import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, CommonModule],
  templateUrl: './app.html',
  standalone: true
})
export class App {
  protected readonly title = signal('Sistema de agua');
  drawerOpen = false;
  isAutenticacion :boolean = true

  expandedMenus: { [key: string]: boolean } = {
    medidor: false,
    lecturas: false,
    tarifa: false,
    gastos: false,
    pagos: false
  };

  usuario = {
    nombre: 'Juan',
    rol: 'Administrador'
  };

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleSubmenu(menu: string) {

    this.expandedMenus[menu] = !this.expandedMenus[menu];
  }
}

import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.html',
})
export class Menu {
drawerOpen = false;

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

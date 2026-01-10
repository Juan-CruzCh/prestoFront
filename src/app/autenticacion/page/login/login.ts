import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
})
export class Login {
   private isAutenticacion:boolean =false

  public isLongin(){
    return this.isAutenticacion
  }


}

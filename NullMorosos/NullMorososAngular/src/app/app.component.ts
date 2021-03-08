import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from "../../node_modules/firebase"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NullMorososAngular';
  usuario: firebase.User;
  cargando: boolean = true
  
  constructor(public afAuth: AngularFireAuth) {
   this.afAuth.user.subscribe((usuario)=>{

      this.cargando = false;
      this.usuario = usuario;

     
   })
  }


  

  
}


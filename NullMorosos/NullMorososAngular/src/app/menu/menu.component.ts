import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from "../../../node_modules/firebase"

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  usuario: firebase.User;

  constructor(public afAuth: AngularFireAuth ) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe((usuario)=>{
      this.usuario = usuario;

     
   })
  }

  logout() {
    this.afAuth.signOut();
  }

}


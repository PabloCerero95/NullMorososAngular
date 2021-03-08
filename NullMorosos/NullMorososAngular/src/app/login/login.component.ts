import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup
  datosCorrectos: boolean = true;
  textoFail: string = ""


  constructor(public creadorFormulario: FormBuilder, public afAuth: AngularFireAuth, private spinner: NgxSpinnerService) { }
  
  ngOnInit() {
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    })
  }

  ingresar()
  {
    if(this.formularioLogin.valid)
    {
      this.datosCorrectos = true;
      this.spinner.show();
      this.afAuth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((usuario)=>{
        console.log(usuario)
        this.spinner.hide();
      }). catch((error)=>{
          this.datosCorrectos = false;
          this.textoFail = "¡Los datos no son correctos! ¡REVISARLO!"
          this.spinner.hide();
      })
    }
    else{
         this.datosCorrectos = false;
         this.textoFail = "¡Los datos no son correctos! ¡REVISARLO!"
    }

  }
}

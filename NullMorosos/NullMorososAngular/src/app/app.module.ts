import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MorososComponent } from './morosos/morosos.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { AddMorosoComponent } from './add-moroso/add-moroso.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar'
import { AngularFireStorageModule } from '@angular/fire/storage';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    MorososComponent,
    AddMorosoComponent,

  ],
  imports: [
    BrowserModule,
    ProgressbarModule.forRoot(),
    CommonModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    AngularFireStorageModule, 
    BrowserAnimationsModule,
    FormsModule, 
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

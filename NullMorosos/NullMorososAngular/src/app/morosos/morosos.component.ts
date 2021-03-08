import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'


@Component({
  selector: 'app-morosos',
  templateUrl: './morosos.component.html',
  styleUrls: ['./morosos.component.css']
})
export class MorososComponent implements OnInit {

  morosos: any[] = new Array<any>();
  moroso: any[]

  constructor( public db: AngularFirestore) { }

  ngOnInit(): void {

   /*  this.db.collection('morosos').valueChanges().subscribe((resultado)=>{
      this.morosos = resultado;
    }); */

    this.morosos.length = 0;
    this.db.collection('morosos').get().subscribe((resultado)=>{
      console.log(resultado.docs)

      resultado.docs.forEach((item)=>{
        let moroso: any = item.data();
        moroso.id  =  item.id;
        moroso.ref = item.ref;

        this.morosos.push(moroso)

        console.log(item.id)
        console.log(item.data())
        console.log(item.ref)
       } )

      
    })
  }

}

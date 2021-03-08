import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-moroso',
  templateUrl: './add-moroso.component.html',
  styleUrls: ['./add-moroso.component.css']
})
export class AddMorosoComponent implements OnInit {

  formMoroso: FormGroup
  Subida: number = 0
  urlImagen: string = ''
  id: string
  editarMoroso: boolean = false;
  loading: boolean = true;

  constructor(public fm: FormBuilder,
    public storage: AngularFireStorage,
    public db: AngularFirestore,
    public activateRoute: ActivatedRoute) { }

  ngOnInit(): void {




    this.formMoroso = this.fm.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      deuda: [''],
      motivo: [''],
      inicioDeuda: ['', Validators.required],
      finDeuda: ['', Validators.required],
      imgUrl: ['', Validators.required]
    })

    this.id = this.activateRoute.snapshot.params.morosoID;

    if (this.id != undefined) {
      this.editarMoroso = true;
      this.db.doc<any>('morosos' + '/' + this.id).valueChanges().subscribe((moroso) => {
        this.formMoroso.setValue({
          nombre: moroso.nombre,
          apellido: moroso.apellido,
          telefono: moroso.telefono,
          deuda: moroso.deuda,
          motivo: moroso.motivo,
          inicioDeuda: moroso.inicioDeuda,
          finDeuda: moroso.finDeuda,
          imgUrl: '',
        })
        this.urlImagen = moroso.imgUrl;
      })
    }
  }

  agregar() {
    this.formMoroso.value.imgUrl = this.urlImagen
    console.log(this.formMoroso.value)
    if (this.loading) {
      this.db.collection('morosos').add(this.formMoroso.value).then((fin) => {
      })
      this.loading = false;
    }
    Swal.fire({

      title: 'Moroso añadido',
      text: 'Ese moroso no se librara :)',
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__zoomInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOutDown'
      }
    })
    setInterval(function(){ window.location.href = "/";}, 4000);
  }

  editar() {
    this.formMoroso.value.imgUrl = this.urlImagen

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Quieres modificar el moroso?',
      text: "¿Te debe mas dinero? ¿Quieres dale mas dias? ¡Modificarlo AHORA!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'POR SUPUESTO',
      cancelButtonText: 'MEJOR NO',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.db.doc('morosos/' + this.id).update(this.formMoroso.value).then(() => {
        })
        swalWithBootstrapButtons.fire(
          'Moroso modificado',
          'Cada segundo cuenta...',
          'success'
        )
        setInterval(function(){ window.location.href = "/";}, 4000);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        setInterval(function(){ window.location.href = "/";}, 4000);
        swalWithBootstrapButtons.fire(
          'CANCELADO',
          'Parece que te has arrepentido a ultima hora...',
          'error'
        )
      }
    })
    
  }

  deleteObject() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Seguro que quiere borrar este moroso?',
      text: "Despues no quiero arrepentimientos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Me ha pagado!',
      cancelButtonText: '¡No, todavia me debe dinero!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      this.db.collection('morosos').doc(this.id).delete().then(()=>{
      })

        swalWithBootstrapButtons.fire(
          '¡Moroso eliminado!',
          'Se puede ir en paz',
          'success'
        )
        setInterval(function(){ window.location.href = "/";}, 4000);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Moroso no eliminado!',
          '¡Cuando te pague, hablamos!',
          'error'
        )
        setInterval(function(){ window.location.href = "/";}, 4000);
      }
    })

  }

  upPhoto(evento: any) {
    if (evento.target.files.length > 0) {

      let nombre = new Date().getTime().toString()
      let photo = evento.target.files[0]
      let formato = photo.name.toString().substring(photo.name.toString().lastIndexOf('.'))
      let url = 'morosos/' + nombre + formato;
      const ref = this.storage.ref(url)
      const add = ref.put(photo)
      add.then((obj) => {
        console.log("imagen subida")
        ref.getDownloadURL().subscribe((url) => {
          this.urlImagen = url;
        })
      })
      add.percentageChanges().subscribe((porcentaje) => {
        this.Subida = porcentaje;
      })
    }


  }
}

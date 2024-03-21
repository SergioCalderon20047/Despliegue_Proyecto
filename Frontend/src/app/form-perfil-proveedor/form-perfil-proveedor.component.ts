import { Component, OnInit } from '@angular/core';
import { datosModel, perfilModel } from '../Shared/usuario.model';
import { UsuarioService } from '../Shared/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-form-perfil-proveedor',
  templateUrl: './form-perfil-proveedor.component.html',
  styleUrls: ['./form-perfil-proveedor.component.css']
})
export class FormPerfilProveedorComponent implements OnInit {
  imagen = "";
  correo='';
  datos = new perfilModel ("","","","","","","","", "","","", "","","", "");

   constructor(
     private usuarioService : UsuarioService,
     private route : ActivatedRoute,
     private router : Router
   ){}

   ngOnInit(): void{
     this.correo = this.route.snapshot.params ['correo']
     if (this.correo){
       console.log('EDITAR');
       this.usuarioService.obtenerusuarioid(this.correo).subscribe(data => {
         this.datos = data[0]
       },error =>{
         console.log(error)
       })
     }
   }

   selectImage(event: any) {
    const file = event.target.files[0];
    this.imagen = file;
  }

   onSubmit(){
    let formd = new FormData();
    formd.append('file',this.imagen);
    this.usuarioService.agregarImangen(formd).subscribe(data => {
      if (data == "No hay archivos"){
        alert(data)
      } else{
        this.datos.foto = data
      }
    })
     console.log('OnSubmit');
     if(this.datos.correo){
       this.usuarioService.actualizarusuario(this.datos).subscribe(data2 => {
        console.log(this.datos)
        alert (data2)
       this.router.navigate(['/pag-prin-proveedor'])
    })
    }
   }
  }
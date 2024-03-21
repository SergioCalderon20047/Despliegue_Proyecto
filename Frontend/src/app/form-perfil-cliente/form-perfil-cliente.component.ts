import { Component, OnInit } from '@angular/core';
import { datosModel, perfilModel } from '../Shared/usuario.model';
import { UsuarioService } from '../Shared/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-perfil-cliente',
  templateUrl: './form-perfil-cliente.component.html',
  styleUrls: ['./form-perfil-cliente.component.css']
})
export class FormPerfilClienteComponent implements OnInit {
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
         this.datos = data[0];
         if (this.datos.celular == '0' || this.datos.celular == null) {
          this.datos.celular = '';
         }
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
       this.router.navigate(['/perfil-cliente'])
    })
    }
   }
}

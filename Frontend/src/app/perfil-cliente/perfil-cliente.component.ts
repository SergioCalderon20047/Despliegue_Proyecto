import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Shared/usuario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { datosModel, perfilModel } from '../Shared/usuario.model';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit{
  datos: Observable <perfilModel[]> | undefined
  constructor (private router:Router, private usuarioService: UsuarioService) {}
  urlimagen=this.usuarioService.apiUrl+"/imagenes/"
  ngOnInit(): void {
    const correo = this.usuarioService.obtenercorreo()
    if (correo) {
      this.datos = this.usuarioService.obtenerusuarioid(correo)
    }
  }
  
}

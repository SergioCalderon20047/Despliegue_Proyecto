import { Component } from '@angular/core';
import { UsuarioService } from '../Shared/usuario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa map desde rxjs/operators
import { datosModel, perfilModel, pesosmodel, productoconpesomodel } from '../Shared/usuario.model';

@Component({
  selector: 'app-pag-prin-cliente',
  templateUrl: './pag-prin-cliente.component.html',
  styleUrls: ['./pag-prin-cliente.component.css']
})
export class PagPrinClienteComponent {
  datos: Observable <perfilModel[]> | undefined
  producto: Observable <productoconpesomodel[]> | undefined
  peso: any
  searchText: string = '';

  constructor (private router:Router, private usuarioService: UsuarioService) {}
  urlimagen=this.usuarioService.apiUrl+"/imagenes/"
  urlimagenp=this.usuarioService.apiUrl+"/productos/"
  ngOnInit(): void {
    const correo = this.usuarioService.obtenercorreo()
    if (correo) {
      this.datos = this.usuarioService.obtenerusuarioid(correo)
    }
    // let correop = this.usuarioService.obtenercorreo()! 
    // this.datos = this.usuarioService.obtenerusuarioid(correop)
    // console.log(this.datos)
    // this.producto = this.usuarioService.obtenerProductoId(id)
    // console.log(this.producto)
    this.producto = this.usuarioService.mostrarproducto();
    // this.producto.subscribe(producto => {
    //   let Id_Peso = producto[0].Id_Peso
    //   this.peso = this.usuarioService.obtenerpeso(Id_Peso)
    // }) 
     
  }

  cerrarsesion() {
    sessionStorage.clear()
    this.router.navigate(['/bienvenido'])
  }

}
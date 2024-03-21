import { Component } from '@angular/core';
import { UsuarioService } from '../Shared/usuario.service'; 
import { productomodel } from '../Shared/usuario.model';
import { Route, Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-form-product-actualizar',
  templateUrl: './form-product-actualizar.component.html',
  styleUrls: ['./form-product-actualizar.component.css']
})
export class FormProductActualizarComponent {
  imagen: File | undefined;
  id = '';
  producto = new productomodel('','','','','','','','','', 1)
  constructor (
    private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router

  ) {}
  ngOnInit () {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      console.log('Editar');
      this.usuarioService.obtenerProductoId(this.id).subscribe(data => {
        this.producto = data[0];
        console.log('Datos del producto:', this.producto);
      }, error => {
        console.error(error);
      });
    } else {
      console.log('Crear');
    }
  }

  selectImage(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.imagen = fileList[0];
    }
  }

  onSubmit() {
    if (!this.imagen) {
      alert('Por favor seleccione una imagen.');
      return;
    }

    let formData = new FormData();
    formData.append('file', this.imagen);

    this.usuarioService.agregarImangenp(formData).subscribe(data => {
      if (data.error) {
        alert(data.error);
      } else {
        this.producto.Url_Imagen = data.filenamep;
        if (this.producto.Id_Producto) {
          this.usuarioService.actualizaproducto(this.producto).subscribe(data => {
            alert(data);
            this.router.navigate(['/pag-prin-proveedor']);
          });
        } else {
          console.log('Crear');
          this.usuarioService.registrarProducto(this.producto).subscribe(data => {
            alert(data);
            this.router.navigate(['/pag-prin-proveedor']);
          });
        }
      }
    });
  }
}

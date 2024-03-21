import { Component } from '@angular/core';

@Component({
  selector: 'app-producto-total-admin',
  templateUrl: './producto-total-admin.component.html',
  styleUrls: ['./producto-total-admin.component.css']
})
export class ProductoTotalAdminComponent {

}

/*import { Component, OnInit } from '@angular/core';
import { ProductService } from 'ruta/al/servicio/producto'; // Asegúrate de importar tu servicio de producto

@Component({
  selector: 'app-productototal',
  templateUrl: './productototal.component.html',
  styleUrls: ['./productototal.component.css']
})
export class ProductototalComponent implements OnInit {
  productos: any[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productService.obtenerProductos().subscribe(
      (data: any[]) => {
        this.productos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarProducto(id: number) {
    this.productService.eliminarProducto(id).subscribe(
      () => {
        this.obtenerProductos();
      },
      error => {
        console.log(error);
      }
    );
  }
}*/

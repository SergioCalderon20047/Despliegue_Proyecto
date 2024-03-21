// En UsuarioService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { datosModel, perfilModel, pesosmodel, productomodel, productoconpesomodel } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, usuario);
  }

  iniciarSesion(usuario: string, password: string, rol: string): Observable<any>{
    const body = {
      correo: usuario,
      password: password,
      rol: rol
    };
  


    // Realiza la llamada al backend para autenticar al usuario
    return this.http.post(`${this.apiUrl}/autenticar`, body);
  }

  observar(correo: string) : Observable <perfilModel[]> {
    return this.http.get <perfilModel[]> (`${this.apiUrl}/mostrar/${correo}`);
  }
  obtenercorreo() {
    return sessionStorage.getItem('correo');
  }
  agregarImangen(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/subir_img`, formData);
  }

  actualizarusuario(datos: perfilModel): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/usuario_info/${datos.correo}`, datos);
  }

  obtenerusuarioid(correo: string): Observable<perfilModel[]> {
    return this.http.get<perfilModel[]>(`${this.apiUrl}/usuario/${correo}`);
  }

  agregarImangenp(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/subir_img_p`, formData);
  }

  registrarProducto(producto: productomodel): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/registrar-producto`, producto);
  }

  obtenerProductoId(id: string): Observable<productomodel[]> {
    return this.http.get<productomodel[]>(`${this.apiUrl}/productos/${id}`);
  }

  actualizaproducto(producto: productomodel): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/productos_actualizar/${producto.Id_Producto}`, producto);
  }

  mostrarproducto(){
    return this.http.get <productoconpesomodel[]> (`${this.apiUrl}/mostrar_producto`);
  }

  borrarproducto(id: string){
    return this.http.delete <string> (`${this.apiUrl}/borrar_produc/${id}`);
  }

  validarCorreo(correo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/validar-correo`, { correo });
  }

  cambiarContrasena(correo: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cambiar-contrasena`, { correo, contrasena });
  }
  // obtenerpeso(id: string) {
  //   return this.http.get <pesosmodel[]> (`${this.apiUrl}/peso_producto/${id}`)
  // }
}


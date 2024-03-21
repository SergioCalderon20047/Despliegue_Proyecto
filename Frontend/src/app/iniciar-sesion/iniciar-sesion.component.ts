import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../Shared/usuario.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  correo: string = '';
  password: string = '';
  rol: string = '';

  constructor(private authService: UsuarioService, private router: Router) {}

  iniciarSesion() {
    if (this.correo == "" || this.password == "" || this.rol == "") {
      alert('faltan datos')
      return;
    }

    // Lógica de autenticación aquí, utiliza tu servicio de autenticación
    this.authService.iniciarSesion(this.correo, this.password, this.rol)
      .subscribe(
        (respuesta) => {
          if (respuesta.message === 'Credenciales incorrectas') {
            alert('Tiene datos incorrectos')
            return;
          }


          if (this.rol === '1') {
            console.log('inicio correctamente sesión');
            sessionStorage.setItem('correo', this.correo);
            this.router.navigate(['/pag-prin-admin']);
          } else if (this.rol === '2') {
            console.log('inicio correctamente sesión');
            sessionStorage.setItem('correo', this.correo);
            this.router.navigate(['/pag-prin-proveedor']);
          } else if (this.rol === '3') {
            console.log('inicio correctamente sesión');
            sessionStorage.setItem('correo', this.correo);
            this.router.navigate(['/pag-prin-cliente']);
          } else {
            console.error('Rol no reconocido');
          }
        },

        (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Datos incorrectos')
        }
      );
  }

}
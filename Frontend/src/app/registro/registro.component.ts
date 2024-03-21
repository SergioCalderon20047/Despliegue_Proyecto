import { Component } from '@angular/core';
import { UsuarioService } from '../Shared/usuario.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  // Definir propiedades para cada campo del formulario
  nombre1: string = '';
  nombre2: string = '';
  apellido1: string = '';
  apellido2: string = '';
  tipodoc: string = '';
  Num_Doc: string = '';
  correo: string = '';
  tel: string = '';
  direccion: string = '';
  local: string = '';
  usuario: string = '';
  rol: string = '';
  password: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrarUsuario() {
    // Utilizar las propiedades del componente para recopilar datos del formulario
    const usuario = {
      nombre1: this.nombre1,
      nombre2: this.nombre2,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      tipodoc: this.tipodoc,
      Num_Doc: this.Num_Doc,
      correo: this.correo,
      usuario: this.usuario,
      direccion: this.direccion,
      local: this.local,
      rol: this.rol,
      password: this.password
    };

    this.usuarioService.registrarUsuario(usuario).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);

        // Alerta sencilla
        alert('Usuario registrado exitosamente');

        this.router.navigate(['/iniciar-sesion']); 
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        alert('Complete los campos de los datos');
      }
    );
  }

  obligatorio(): boolean {
    if (this.rol === '2') {
      return (
        this.Num_Doc !== '' &&
        this.nombre1 !== '' &&
        this.apellido1 !== '' &&
        this.correo !== '' &&
        this.password !== '' &&
        this.usuario !== '' &&
        this.direccion !== '' &&
        this.local !== ''
      );
    } else if (this.rol === '3') {
      return (
        this.Num_Doc !== '' &&
        this.nombre1 !== '' &&
        this.apellido1 !== '' &&
        this.correo !== '' &&
        this.password !== '' &&
        this.usuario !== ''
      );
    } else {
      return false; // Si el rol no es ni 2 ni 3, el formulario no será obligatorio
    }
  }
}  
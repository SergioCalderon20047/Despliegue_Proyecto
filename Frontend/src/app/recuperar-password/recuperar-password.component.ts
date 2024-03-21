import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../Shared/usuario.service'; 

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  correo: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  correoValidado: boolean = false;
  cambioContrasenaExitoso: boolean = false;
  error: string = '';

  constructor(private dataService: UsuarioService, private router: Router) {}

  validarCorreo() {
    this.dataService.validarCorreo(this.correo).subscribe((response: any) => {
      if (response.validado) {
        this.correoValidado = true;
        this.error = '';
      } else {
        alert('El correo no se encuentra registrado')
        this.error = response.error;
      }
    });
  }

  cambiarContrasena() {
    if (this.nuevaContrasena == "" || this.confirmarContrasena == "") {
      alert('Los campos estan vacios')
      return;
    }

    if (this.nuevaContrasena === this.confirmarContrasena) {
      this.dataService.cambiarContrasena(this.correo, this.nuevaContrasena).subscribe((response: any) => {
        if (response.cambioExitoso) {
          alert('Cambio de contraseña exitosa')
          this.cambioContrasenaExitoso = true;
          this.router.navigate(['/iniciar-sesion'])
          this.error = '';
        } else {
          alert('Error al cambiar contraseña')
          this.error = response.error;
        }
      });
    } else {
      alert('Las contraseñas no coinciden.')
      this.error = 'Las contraseñas no coinciden.';
    }
  }
}
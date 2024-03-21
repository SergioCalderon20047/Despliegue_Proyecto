import { Component } from '@angular/core';
import { UsuarioService } from '../Shared/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pag-prin-admin',
  templateUrl: './pag-prin-admin.component.html',
  styleUrls: ['./pag-prin-admin.component.css']
})
export class PagPrinAdminComponent {
  constructor (private router:Router, private usuarioService: UsuarioService) {}
  cerrarsesion() {
    sessionStorage.clear()
    this.router.navigate(['/bienvenido'])
  }
}

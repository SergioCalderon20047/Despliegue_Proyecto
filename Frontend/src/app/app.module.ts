import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { AppRoutingModule,routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { RegistroComponent } from './registro/registro.component';

import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { DetalleCilantroComponent } from './detalle-cilantro/detalle-cilantro.component';
import { DetalleMangoComponent } from './detalle-mango/detalle-mango.component';
import { DetalleMelonComponent } from './detalle-melon/detalle-melon.component';
import { DetalleSandiaComponent } from './detalle-sandia/detalle-sandia.component';
import { DetalleTomateComponent } from './detalle-tomate/detalle-tomate.component';
import { DetalleZanahoriaComponent } from './detalle-zanahoria/detalle-zanahoria.component';
import { FormPerfilClienteComponent } from './form-perfil-cliente/form-perfil-cliente.component';
import { FormPerfilProveedorComponent } from './form-perfil-proveedor/form-perfil-proveedor.component';
import { FormProductProveedorComponent } from './form-product-proveedor/form-product-proveedor.component';
import { FormRegistradosComponent } from './form-registrados/form-registrados.component';
import { PagPrinAdminComponent } from './pag-prin-admin/pag-prin-admin.component';
import { PagPrinClienteComponent } from './pag-prin-cliente/pag-prin-cliente.component';
import { PagPrinProveedorComponent } from './pag-prin-proveedor/pag-prin-proveedor.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { RegistradosComponent } from './registrados/registrados.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { UsuarioService } from './Shared/usuario.service';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { ProductoTotalAdminComponent } from './producto-total-admin/producto-total-admin.component';
import { FormProductActualizarComponent } from './form-product-actualizar/form-product-actualizar.component';
import { PerfilProveedorComponent } from './perfil-proveedor/perfil-proveedor.component';



@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    RegistroComponent,
    
    IniciarSesionComponent,
         DetalleCilantroComponent,
         DetalleMangoComponent,
         DetalleMelonComponent,
         DetalleSandiaComponent,
         DetalleTomateComponent,
         DetalleZanahoriaComponent,
         FormPerfilClienteComponent,
         FormPerfilProveedorComponent,
         FormProductProveedorComponent,
         FormRegistradosComponent,
         PagPrinAdminComponent,
         PagPrinClienteComponent,
         PagPrinProveedorComponent,
         PerfilClienteComponent,
         RegistradosComponent,
         ReservacionesComponent,
         RecuperarPasswordComponent,
         ProductoTotalAdminComponent,
         FormProductActualizarComponent,
         PerfilProveedorComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    UsuarioService, [DatePipe], [CurrencyPipe]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

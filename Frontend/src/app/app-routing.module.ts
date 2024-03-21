import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { RegistroComponent } from './registro/registro.component';
import { DetalleCilantroComponent } from './detalle-cilantro/detalle-cilantro.component';
import { DetalleMangoComponent } from './detalle-mango/detalle-mango.component';
import { DetalleMelonComponent } from './detalle-melon/detalle-melon.component';
import { DetalleSandiaComponent } from './detalle-sandia/detalle-sandia.component';
import { DetalleTomateComponent } from './detalle-tomate/detalle-tomate.component';
import { DetalleZanahoriaComponent } from './detalle-zanahoria/detalle-zanahoria.component';
import { FormPerfilClienteComponent } from './form-perfil-cliente/form-perfil-cliente.component';
import { FormPerfilProveedorComponent } from './form-perfil-proveedor/form-perfil-proveedor.component';
import { FormProductProveedorComponent } from './form-product-proveedor/form-product-proveedor.component';
import { FormProductActualizarComponent } from './form-product-actualizar/form-product-actualizar.component';
import { FormRegistradosComponent } from './form-registrados/form-registrados.component';
import { PagPrinAdminComponent } from './pag-prin-admin/pag-prin-admin.component';
import { PagPrinClienteComponent } from './pag-prin-cliente/pag-prin-cliente.component';
import { PagPrinProveedorComponent } from './pag-prin-proveedor/pag-prin-proveedor.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { RegistradosComponent } from './registrados/registrados.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { ProductoTotalAdminComponent } from './producto-total-admin/producto-total-admin.component';

export const routes: Routes = [
  {path: 'registro', component: RegistroComponent},
  {path: 'bienvenido', component: BienvenidoComponent},
  {path: 'iniciar-sesion', component:IniciarSesionComponent },
  {path: 'Recuperar', component: RecuperarPasswordComponent},
  {path: 'pag-prin-admin', component: PagPrinAdminComponent},
  {path: 'pag-prin-cliente', component: PagPrinClienteComponent},
  {path: 'pag-prin-proveedor', component: PagPrinProveedorComponent},
  {path: 'form-perfil-cliente/:correo', component: FormPerfilClienteComponent},
  {path: 'form-perfil-proveedor/:correo', component: FormPerfilProveedorComponent},
  {path: 'form-product-proveedor', component: FormProductProveedorComponent},
  {path: 'form-product-proveedor/actualizar/:id', component: FormProductProveedorComponent},
  {path: 'form-product-actualizar/:id', component: FormProductActualizarComponent},
  {path: 'form-registrados', component: FormRegistradosComponent},
  {path: 'perfil-cliente', component: PerfilClienteComponent},
  {path: 'registrados', component: RegistradosComponent},
  {path: 'reservaciones', component: ReservacionesComponent},
  {path: 'detalle-cilantro', component: DetalleCilantroComponent},
  {path: 'detalle-mango', component: DetalleMangoComponent},
  {path: 'detalle-melon', component: DetalleMelonComponent},
  {path: 'detalle-sandia', component: DetalleSandiaComponent},
  {path: 'detalle-tomate', component: DetalleTomateComponent},
  {path: 'detalle-zanahoria', component: DetalleZanahoriaComponent},
  {path: 'producto-total-admin', component: ProductoTotalAdminComponent},
  { path: '', pathMatch: 'full', redirectTo: '/bienvenido'},
  { path: '**', pathMatch: 'full',redirectTo:'/bienvenido'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

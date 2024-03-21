import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilProveedorComponent } from './perfil-proveedor.component';

describe('PerfilProveedorComponent', () => {
  let component: PerfilProveedorComponent;
  let fixture: ComponentFixture<PerfilProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilProveedorComponent]
    });
    fixture = TestBed.createComponent(PerfilProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

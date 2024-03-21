import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfilProveedorComponent } from './form-perfil-proveedor.component';

describe('FormPerfilProveedorComponent', () => {
  let component: FormPerfilProveedorComponent;
  let fixture: ComponentFixture<FormPerfilProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPerfilProveedorComponent]
    });
    fixture = TestBed.createComponent(FormPerfilProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

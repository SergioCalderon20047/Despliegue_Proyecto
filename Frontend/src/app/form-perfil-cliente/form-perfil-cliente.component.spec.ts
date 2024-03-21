import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfilClienteComponent } from './form-perfil-cliente.component';

describe('FormPerfilClienteComponent', () => {
  let component: FormPerfilClienteComponent;
  let fixture: ComponentFixture<FormPerfilClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPerfilClienteComponent]
    });
    fixture = TestBed.createComponent(FormPerfilClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

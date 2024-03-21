import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductProveedorComponent } from './form-product-proveedor.component';

describe('FormProductProveedorComponent', () => {
  let component: FormProductProveedorComponent;
  let fixture: ComponentFixture<FormProductProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProductProveedorComponent]
    });
    fixture = TestBed.createComponent(FormProductProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

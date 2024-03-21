import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductActualizarComponent } from './form-product-actualizar.component';

describe('FormProductActualizarComponent', () => {
  let component: FormProductActualizarComponent;
  let fixture: ComponentFixture<FormProductActualizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProductActualizarComponent]
    });
    fixture = TestBed.createComponent(FormProductActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

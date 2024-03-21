import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPrinProveedorComponent } from './pag-prin-proveedor.component';

describe('PagPrinProveedorComponent', () => {
  let component: PagPrinProveedorComponent;
  let fixture: ComponentFixture<PagPrinProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagPrinProveedorComponent]
    });
    fixture = TestBed.createComponent(PagPrinProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMangoComponent } from './detalle-mango.component';

describe('DetalleMangoComponent', () => {
  let component: DetalleMangoComponent;
  let fixture: ComponentFixture<DetalleMangoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleMangoComponent]
    });
    fixture = TestBed.createComponent(DetalleMangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

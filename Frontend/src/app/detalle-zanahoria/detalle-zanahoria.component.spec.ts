import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleZanahoriaComponent } from './detalle-zanahoria.component';

describe('DetalleZanahoriaComponent', () => {
  let component: DetalleZanahoriaComponent;
  let fixture: ComponentFixture<DetalleZanahoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleZanahoriaComponent]
    });
    fixture = TestBed.createComponent(DetalleZanahoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

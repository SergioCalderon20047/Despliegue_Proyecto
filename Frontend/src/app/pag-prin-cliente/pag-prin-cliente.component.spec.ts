import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPrinClienteComponent } from './pag-prin-cliente.component';

describe('PagPrinClienteComponent', () => {
  let component: PagPrinClienteComponent;
  let fixture: ComponentFixture<PagPrinClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagPrinClienteComponent]
    });
    fixture = TestBed.createComponent(PagPrinClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

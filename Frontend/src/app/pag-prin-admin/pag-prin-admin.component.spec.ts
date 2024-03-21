import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPrinAdminComponent } from './pag-prin-admin.component';

describe('PagPrinAdminComponent', () => {
  let component: PagPrinAdminComponent;
  let fixture: ComponentFixture<PagPrinAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagPrinAdminComponent]
    });
    fixture = TestBed.createComponent(PagPrinAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

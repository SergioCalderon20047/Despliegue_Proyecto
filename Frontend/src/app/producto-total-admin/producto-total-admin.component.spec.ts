import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoTotalAdminComponent } from './producto-total-admin.component';

describe('ProductoTotalAdminComponent', () => {
  let component: ProductoTotalAdminComponent;
  let fixture: ComponentFixture<ProductoTotalAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoTotalAdminComponent]
    });
    fixture = TestBed.createComponent(ProductoTotalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

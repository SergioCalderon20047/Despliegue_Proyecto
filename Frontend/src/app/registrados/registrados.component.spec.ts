import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistradosComponent } from './registrados.component';

describe('RegistradosComponent', () => {
  let component: RegistradosComponent;
  let fixture: ComponentFixture<RegistradosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistradosComponent]
    });
    fixture = TestBed.createComponent(RegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

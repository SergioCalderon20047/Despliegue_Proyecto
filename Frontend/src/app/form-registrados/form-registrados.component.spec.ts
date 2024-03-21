import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistradosComponent } from './form-registrados.component';

describe('FormRegistradosComponent', () => {
  let component: FormRegistradosComponent;
  let fixture: ComponentFixture<FormRegistradosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegistradosComponent]
    });
    fixture = TestBed.createComponent(FormRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

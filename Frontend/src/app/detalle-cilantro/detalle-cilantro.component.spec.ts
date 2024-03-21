import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCilantroComponent } from './detalle-cilantro.component';

describe('DetalleCilantroComponent', () => {
  let component: DetalleCilantroComponent;
  let fixture: ComponentFixture<DetalleCilantroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleCilantroComponent]
    });
    fixture = TestBed.createComponent(DetalleCilantroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

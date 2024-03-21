import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMelonComponent } from './detalle-melon.component';

describe('DetalleMelonComponent', () => {
  let component: DetalleMelonComponent;
  let fixture: ComponentFixture<DetalleMelonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleMelonComponent]
    });
    fixture = TestBed.createComponent(DetalleMelonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

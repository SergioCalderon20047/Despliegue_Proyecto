import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTomateComponent } from './detalle-tomate.component';

describe('DetalleTomateComponent', () => {
  let component: DetalleTomateComponent;
  let fixture: ComponentFixture<DetalleTomateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleTomateComponent]
    });
    fixture = TestBed.createComponent(DetalleTomateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSandiaComponent } from './detalle-sandia.component';

describe('DetalleSandiaComponent', () => {
  let component: DetalleSandiaComponent;
  let fixture: ComponentFixture<DetalleSandiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleSandiaComponent]
    });
    fixture = TestBed.createComponent(DetalleSandiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

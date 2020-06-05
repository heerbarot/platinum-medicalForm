import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignCanvasComponent } from './sign-canvas.component';

describe('SignCanvasComponent', () => {
  let component: SignCanvasComponent;
  let fixture: ComponentFixture<SignCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

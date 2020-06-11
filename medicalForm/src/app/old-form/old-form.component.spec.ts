import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldFormComponent } from './old-form.component';

describe('OldFormComponent', () => {
  let component: OldFormComponent;
  let fixture: ComponentFixture<OldFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

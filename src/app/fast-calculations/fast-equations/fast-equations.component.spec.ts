import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastEquationsComponent } from './fast-equations.component';

describe('FastEquationsComponent', () => {
  let component: FastEquationsComponent;
  let fixture: ComponentFixture<FastEquationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastEquationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastEquationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

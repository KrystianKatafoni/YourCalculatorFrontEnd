import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastCalculatorComponent } from './fast-calculator.component';

describe('FastCalculatorComponent', () => {
  let component: FastCalculatorComponent;
  let fixture: ComponentFixture<FastCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

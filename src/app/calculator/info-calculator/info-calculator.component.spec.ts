import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCalculatorComponent } from './info-calculator.component';

describe('InfoCalculatorComponent', () => {
  let component: InfoCalculatorComponent;
  let fixture: ComponentFixture<InfoCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

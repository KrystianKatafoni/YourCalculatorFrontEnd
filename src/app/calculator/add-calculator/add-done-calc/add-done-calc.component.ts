import {Component, Input, OnInit} from '@angular/core';
import {CalculatorModel} from "../../../shared/calculator.model";
import {MatStepper} from "@angular/material";

@Component({
  selector: 'app-add-done-calc',
  templateUrl: './add-done-calc.component.html',
  styleUrls: ['./add-done-calc.component.css']
})
export class AddDoneCalcComponent implements OnInit {
  @Input() calculator: CalculatorModel;
  get calculatorModel() {
    return this.calculator;
  }
  @Input() stepper: MatStepper;

  constructor() { }

  ngOnInit() {
  }

}

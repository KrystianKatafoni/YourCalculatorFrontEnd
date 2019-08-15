import {Component, Input, OnInit} from '@angular/core';
import {CalculatorModel} from "../../../shared/calculator.model";
import {CalculatorStorageService} from "../../../shared/calculator-storage.service";

@Component({
  selector: 'app-add-acceptance-calc',
  templateUrl: './add-acceptance-calc.component.html',
  styleUrls: ['./add-acceptance-calc.component.css']
})
export class AddAcceptanceCalcComponent implements OnInit {
  @Input() calculator: CalculatorModel;
  constructor(private calculatorStorage: CalculatorStorageService) { }

  ngOnInit() {
  }
  onAcceptance() {
    this.calculatorStorage.addCalculator(this.calculator);
  }
}

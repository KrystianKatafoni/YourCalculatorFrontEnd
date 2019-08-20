import {Component, Input, OnInit} from '@angular/core';
import {CalculatorModel} from "../../../shared/model/calculator.model";
import {MatStepper} from "@angular/material";
import {CalculatorStorageService} from "../../../shared/storage/calculator-storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-done-calc',
  templateUrl: './add-done-calc.component.html',
  styleUrls: ['./add-done-calc.component.css']
})
export class AddDoneCalcComponent implements OnInit {
  @Input() calculator: CalculatorModel;
  @Input() stepper: MatStepper;
  @Input() key: string;
  constructor() {
    console.log('done constructor');
  }
  ngOnInit() {
    console.log('done init');
  }
}

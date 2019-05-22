import { Component, OnInit } from '@angular/core';
import {faCalculator} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  calculator = faCalculator;
  plus = faPlus;
  edit = faEdit;
  circle = faInfoCircle;
  constructor() { }

  ngOnInit() {
  }

}

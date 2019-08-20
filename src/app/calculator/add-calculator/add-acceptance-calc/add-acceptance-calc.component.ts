import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalculatorModel} from '../../../shared/model/calculator.model';
import {CalculatorStorageService} from '../../../shared/storage/calculator-storage.service';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons/faSignOutAlt";

@Component({
  selector: 'app-add-acceptance-calc',
  templateUrl: './add-acceptance-calc.component.html',
  styleUrls: ['./add-acceptance-calc.component.css']
})
export class AddAcceptanceCalcComponent implements OnInit {
  @Input() calculator: CalculatorModel;
  @Output() newKey = new EventEmitter<string>();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(private calculatorStorage: CalculatorStorageService) { }
  key = '';
  info = faInfoCircle;
  input = faSignInAlt;
  output = faSignOutAlt;
  ngOnInit() {
  }
  onAcceptance() {
    this.key = this.calculatorStorage.addCalculator(this.calculator);
    this.newKey.emit(this.key);
  }

}

import { Injectable } from '@angular/core';
import {Calculator} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator';
import {Subject} from 'rxjs';
import {CalculatorStorageService} from '../shared/storage/calculator-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  calculatorsChanged = new Subject<[]>();

  constructor(private calculatorStorage: CalculatorStorageService) { }

  addCalculator(operations) {
    this.calculatorsChanged.next(operations);
    this.calculatorStorage.addCalculator(operations);
  }
}

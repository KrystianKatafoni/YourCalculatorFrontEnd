import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalculatorService} from '../calculator/calculator.service';
import {CalculatorModel} from './calculator.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorStorageService {

  constructor(private http: HttpClient) {

  }
  addCalculator(calculator: CalculatorModel) {
    this.http.post('https://yourcalculator-7a3d7.firebaseio.com/calculators.json', calculator)
      .subscribe(response => { console.log(response); });
  }
}

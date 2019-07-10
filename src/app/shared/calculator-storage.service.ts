import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalculatorService} from '../calculator/calculator.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorStorageService {

  constructor(private http: HttpClient) {

  }
  addCalculator(operations) {
    this.http.post('https://yourcalculator-7a3d7.firebaseio.com/calculators.json',operations).subscribe(response => { console.log(response)})
  }
}

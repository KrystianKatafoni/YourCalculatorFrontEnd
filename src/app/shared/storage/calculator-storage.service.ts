import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {CalculatorModel} from '../model/calculator.model';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalculatorStorageService implements OnInit, OnDestroy {
  calculators: AngularFireList<CalculatorModel>;
  calculatorData: Observable<{key: string, data: CalculatorModel}[]>;
  lastKey: string;
  constructor(private db: AngularFireDatabase) {
    this.calculators = this.db.list<CalculatorModel>('/calculators');
    this.calculatorData = this.calculators
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, data};           // or {key, ...data} in case data is Obj
        });
      }));
  }
  ngOnInit(): void {
  }



  addCalculator(calculator: CalculatorModel): string {
    const key = this.calculators.push(calculator).key;
    this.lastKey = key;
    return this.lastKey;
  }
  getCalculators() {
    return this.calculatorData;
  }
  getCalculatorById(key: string) {

    let returnCalculator: Array<{key: string, data: CalculatorModel}>;
    this.calculatorData.subscribe( item => { returnCalculator = item; });
    return returnCalculator;
  }
  private handleError(error) {
    console.log(error);
  }
  ngOnDestroy() {

  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CalculatorStorageService} from "../shared/storage/calculator-storage.service";
import {CalculatorModel} from "../shared/model/calculator.model";
import {faCalculator} from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OutputValueModel} from "../shared/model/outputValue.model";
import * as matjs from "mathjs";
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  id: string;
  calculator = faCalculator;
  private sub: any;
  isTogetherMode = false;
  calculatorWithId: {key: string, data: CalculatorModel};
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {

  }

  ngOnInit() {
    let id;
    const con: {key: string, data: CalculatorModel}[] = this.route.snapshot.data.calculator;
    this.route.params.subscribe(
      (params) => {
        id = params['id'];
      });
    this.calculatorWithId = con.filter(item => item.key === id)[0];

  }
  evaluateOutput(output: OutputValueModel) {
    const exp = this.arrayToStringConverter(output.expression);
    let compileResult;
    console.log(exp);
    try {
      compileResult = matjs.eval(exp);

    } catch (e) {
      console.log('Compile error');
      console.log(e);
    }
    console.log(compileResult);
    output.value = compileResult;
  }

  arrayToStringConverter(array): string {
    let exp = '';
    array.forEach( (value, key) => {
      if (value.type === 'input') {
        exp = exp + value.value;
      } else if (value.type === 'const') {
        exp = exp + value.name;
      } else if (value.type === 'operator') {
        exp = exp + value.symbol;
      }
    });
    return exp;
  }
  ngOnDestroy(): void {

  }
}

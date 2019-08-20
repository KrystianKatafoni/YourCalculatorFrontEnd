import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, copyArrayItem, moveItemInArray} from '@angular/cdk/drag-drop';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {AddCalculatorComponent} from '../add-calculator.component';
import {CalculatorModel} from '../../../shared/model/calculator.model';
import * as matjs from 'mathjs';

@Component({
  selector: 'app-add-expression-calc',
  templateUrl: './add-expression-calc.component.html',
  styleUrls: ['./add-expression-calc.component.css']
})
export class AddExpressionCalcComponent implements OnInit {
  mathOperators = [{name: ' + ', symbol: ' + ', type: 'operator'}, {name: '-', symbol: '-', type: 'operator'}, {name: '*', symbol: '*', type: 'operator'},
    {name: '/', symbol: '/', type: 'operator'}, {name: '(', symbol: '(', type: 'operator'}, {name:  ')', symbol: ')', type: 'operator'},
    {name:  '[', symbol: '[', type: 'operator'}, {name:  ']', symbol: ']', type: 'operator'}];
  expressionForm: FormGroup;
  expressionList: FormArray;
  preparedExpressions = [];
  expressionsValid = false;
  thumbUp = faThumbsUp;
  thumbDown = faThumbsDown;
  private toExpressionContainer = false;
  private fromExpressionContainer = false;
  @Input() calculator: CalculatorModel;
  get calculatorModel() {
    return this.calculator;
  }
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.expressionForm = this.fb.group({
      expressionList: this.fb.array([], Validators.required)
    });
  }
  arrayToStringConverter(array): string {
    let exp = '';

    array.forEach( (value, key) => {
      if (value.type === 'input' || value.type === 'operator') {
        exp = exp + value.symbol;
    } else if (value.type === 'const') {
        exp = exp + value.name;
      }
    });
    return exp;
  }
  createExpression(symbolIn: string, nameIn: string): FormGroup {
    return this.fb.group({
      expression: '',
      symbol: symbolIn,
      name: nameIn
    });
  }
  drop(event, i: number) {
    this.toExpressionContainer = false;
    this.fromExpressionContainer = false;
    this.preparedExpressions.forEach((value, key) => {
      if (value.exp === event.container.data) {
        this.toExpressionContainer = true;

      }
      if (value.exp === event.previousContainer.data) {
        this.fromExpressionContainer = true;
      }
    });
    if (this.fromExpressionContainer) {
      if (!event.isPointerOverContainer) {
        console.log('over');
        event.previousContainer.data.splice(event.previousIndex, 1);
      }
    }
    if (this.toExpressionContainer) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
      console.log('event container: ')
      console.log(event.container.data)
      const exp = this.arrayToStringConverter(event.container.data);
      const isValid = this.validateExpressionString(exp);
      const isValidObject = this.validateExpressionObjects(event.container.data)
      if (isValid && isValidObject) {
        this.preparedExpressions[i].valid = true;
        console.log('valid true');
      } else {
        this.preparedExpressions[i].valid = false;
        console.log('valid false');
      }
    }
    let valid = true;
    this.preparedExpressions.forEach((item) => {
        valid = item.valid && valid;
    });
    console.log('valid' + valid);
    this.expressionsValid = valid;
  }
  validateExpressionObjects(expression): boolean {
    let valid = true;
    let lastItemType = '';
    expression.forEach((item) => {
      if ((item.type === 'const' || item.type === 'input') && (lastItemType === 'const' || lastItemType === 'input')) {
        valid = false;
      } else {
        lastItemType = item.type;
      }
    });
    return valid;
  }
  validateExpressionString(expression: string): boolean {
    console.log('exp: ' + expression);
    let result = false;
    let newExp = expression.slice(0, expression.length);
    this.calculator.inputs.forEach((input) => {
      if (newExp.includes(input.symbol)) {
        newExp = newExp.split(input.symbol).join('1');

      }
    });
    console.log(newExp);
    try {
      const compileResult = matjs.compile(newExp);
      console.log(compileResult);
      result = true;

    } catch (e) {
      console.log('Compile error');
      console.log(e);
    }
    if (expression.length === 0) {
      result = false;
    }
    return result;
  }

}

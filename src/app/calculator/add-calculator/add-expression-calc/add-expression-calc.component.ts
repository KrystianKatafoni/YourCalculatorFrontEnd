import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, copyArrayItem, moveItemInArray} from '@angular/cdk/drag-drop';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {AddCalculatorComponent} from '../add-calculator.component';
import {CalculatorModel} from '../../../shared/calculator.model';
import * as matjs from "mathjs";
@Component({
  selector: 'app-add-expression-calc',
  templateUrl: './add-expression-calc.component.html',
  styleUrls: ['./add-expression-calc.component.css']
})
export class AddExpressionCalcComponent implements OnInit {
  mathOperators = [{name: '+', type: 'operator'}, {name: '-', type: 'operator'}, {name: '*', type: 'operator'},
    {name: '/', type: 'operator'}, {name: '(', type: 'operator'}, {name:  ')', type: 'operator'},
    {name:  '[', type: 'operator'}, {name:  ']', type: 'operator'}];
  expressionForm: FormGroup;
  expressionList: FormArray;
  preparedExpressions = [];
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
      exp = exp + value.name;
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
  drop(event: CdkDragDrop<string[]>, i: number) {
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
      const exp = this.arrayToStringConverter(event.container.data);
      const isValid = this.validateExpression(exp);
      if (isValid) {
        this.preparedExpressions[i].valid = 'true';
        console.log('valid true');
      } else {
        this.preparedExpressions[i].valid = 'false';
        console.log('valid false');
      }
    }

  }
  validateExpression(expression: string): boolean {
    let result = false;
    let newExp = expression.slice(0, expression.length);
    this.calculator.inputs.forEach((input) => {
      if (newExp.includes(input.name)) {
        newExp = newExp.split(input.name).join('1');

      }
    });
    this.calculator.constants.forEach((constant) => {
      if (newExp.includes(constant.name)) {
        newExp = newExp.split(constant.name).join(constant.value.toString());
      }
    });
    console.log(newExp);
    try {
      const compileResult = matjs.compile(newExp).eval();
      console.log(compileResult);
      result = true;

    } catch (e) {
      console.log('Compile error');
      console.log(e);
    }
    return result;
  }

}

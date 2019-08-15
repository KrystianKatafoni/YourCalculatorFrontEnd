import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {VariablesDialogComponent} from '../variables-dialog/variables-dialog.component';
import {Router} from '@angular/router';
import * as matjs from 'mathjs';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {CalculatorService} from '../calculator.service';
import {CalculatorModel} from '../../shared/calculator.model';
import {AddInfoCalcService} from './add-info-calc/add-info-calc.service';
import {AddConstCalcComponent} from './add-const-calc/add-const-calc.component';
import {AddInfoCalcComponent} from './add-info-calc/add-info-calc.component';
import {AddInputCalcComponent} from './add-input-calc/add-input-calc.component';
import {AddOutputCalcComponent} from './add-output-calc/add-output-calc.component';
import {AddExpressionCalcComponent} from './add-expression-calc/add-expression-calc.component';
import {ConstantValueModel} from "../../shared/constantValue.model";
import {InputValueModel} from "../../shared/inputValue.model";
import {OutputValueModel} from "../../shared/outputValue.model";
import {CalculatorInfoModel} from "../../shared/calculator-info.model";

@Component({
  selector: 'app-add-calculator',
  templateUrl: './add-calculator.component.html',
  styleUrls: ['./add-calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCalculatorComponent implements OnInit {
  calculator: CalculatorModel;
  @ViewChild(AddConstCalcComponent) addConstCalcComponent: AddConstCalcComponent;
  @ViewChild(AddInfoCalcComponent) addInfoCalcComponent: AddInfoCalcComponent;
  @ViewChild(AddInputCalcComponent) addInputCalcComponent: AddInputCalcComponent;
  @ViewChild(AddOutputCalcComponent) addOutputCalcComponent: AddOutputCalcComponent;
  @ViewChild(AddExpressionCalcComponent) addExpressionCalcComponent: AddExpressionCalcComponent;
  expressions: FormArray;
  get formConstCalc() {
    return this.addConstCalcComponent ? this.addConstCalcComponent.constForm : null;
  }
  get formInfoCalc() {
    return this.addInfoCalcComponent ? this.addInfoCalcComponent.informationForm : null;
  }
  get formInputCalc() {
    return this.addInputCalcComponent ? this.addInputCalcComponent.inputForm : null;
  }
  get formOutputCalc() {
    return this.addOutputCalcComponent ? this.addOutputCalcComponent.outputForm : null;
  }
  get formExpressionCalc() {
    return this.addExpressionCalcComponent ? this.addExpressionCalcComponent.expressionForm : null;
  }
  constructor(private cdRef: ChangeDetectorRef, private calculatorService: CalculatorService,
              private addInfoCalcService: AddInfoCalcService, private fb: FormBuilder) {
    this.calculator = new CalculatorModel();
  }

  ngOnInit() {
    this.cdRef.detectChanges();

  }

  public onStepChange(event: any): void {

    switch (event.selectedIndex) {
      case 1: {
        this.createInfoObject();

        break;
      }
      case 3: {

        break;
      }
      case 4: {
        this.createConstObjects();
        this.createInputsObjects();
        this.createOutputObjects();
        this.defineExpressions();

        break;
      }
      case 5: {
        this.prepareCalculatorModel();
        break;
      }
      default: {
        // statements;
        break;
      }
    }
  }
  createInfoObject() {
    const info = new CalculatorInfoModel();
    info.name = this.formInfoCalc.get('calcName').value;
    info.description = this.formInfoCalc.get('calcDesc').value;
    info.owner = this.formInfoCalc.get('owner').value;
    this.calculator.information = info;
  }
  createConstObjects() {
    this.calculator.constants = [];
    const constArray = this.formConstCalc.get('constList') as FormArray;
    constArray.controls.forEach((item) => {
      const constValueModel = new ConstantValueModel();
      constValueModel.name = item.get('name').value;
      constValueModel.value = item.get('value').value;
      constValueModel.symbol = item.get('symbol').value;
      constValueModel.unit = item.get('unit').value;
      this.calculator.constants.push(constValueModel);
    });
  }
  createInputsObjects() {
    this.calculator.inputs = [];
    const inputArray = this.formInputCalc.get('inputList') as FormArray;
    inputArray.controls.forEach((item) => {
      const inputValueModel = new InputValueModel();
      inputValueModel.name = item.get('name').value;
      inputValueModel.description = item.get('description').value;
      inputValueModel.symbol = item.get('symbol').value;
      inputValueModel.unit = item.get('unit').value;
      this.calculator.inputs.push(inputValueModel);
    });
  }
  createOutputObjects() {
    this.calculator.outputs = [];
    const outputArray = this.formOutputCalc.get('outputList') as FormArray;
    outputArray.controls.forEach((item) => {
      const outputValueModel = new OutputValueModel();
      outputValueModel.name = item.get('name').value;
      outputValueModel.description = item.get('description').value;
      outputValueModel.symbol = item.get('symbol').value;
      outputValueModel.unit = item.get('unit').value;
      this.calculator.outputs.push(outputValueModel);
    });
  }
  defineExpressions() {
    this.expressions = this.formExpressionCalc.get('expressionList') as FormArray;
    while (this.expressions.length !== 0) {
      this.expressions.removeAt(0);
    }
    this.calculator.outputs.forEach((item) => {
      this.expressions.push(this.addExpressionCalcComponent.createExpression(item.name, item.symbol));
      this.addExpressionCalcComponent.preparedExpressions.push({exp: [], valid: '', symbol: item.symbol});
    });
  }
  prepareCalculatorModel() {
    this.addExpressionCalcComponent.preparedExpressions.forEach((item) => {
      this.calculator.outputs.forEach((output) => {
        if (output.symbol === item.symbol) {
          output.expression = item.exp;
        }
      });
    });
  }

}


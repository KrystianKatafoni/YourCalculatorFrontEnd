import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {VariablesDialogComponent} from '../variables-dialog/variables-dialog.component';
import {Router} from '@angular/router';
import * as matjs from 'mathjs';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {CalculatorService} from '../calculator.service';
import {CalculatorModel} from "../../shared/calculator.model";

@Component({
  selector: 'app-add-calculator',
  templateUrl: './add-calculator.component.html',
  styleUrls: ['./add-calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCalculatorComponent implements OnInit {
  symbolsInput = 'inputA,inputB,inputC,inputD,inputE,inputF,inputG,inputH,inputI,inputJ,inputK,inputL,inputM,inputN,inputO,inputP,inputR,inputS,inputT,inputU,inputW,inputX,inputY,inputZ'.split(',');
  symbolsOutput = 'outputA,outputB,outputC,outputD,outputE,outputF,outputG,outputH,outputI,outputJ,outputK,outputL,outputM,outputN,outputO,outputP,outputR,outputS,outputT,outputU,outputW,outputX,outputY,outputZ'.split(',');
  symbolsConst = 'constantA,constantB,constantC,constantD,constantE,constantF,constantG,constantH,constantI,constantJ,constantK,constantL,constantM,constantN,constantO,constantP,constantR,constantS,constantT,constantU,constantW,constantX,constantY,constantZ'.split(',');
  mathOperators = ['+', '-', '*', '/', '(', ')', '[', ']'];
  thumbUp = faThumbsUp;
  thumbDown = faThumbsDown;
  inputsForm: FormGroup;
  informationForm: FormGroup;
  outputForm: FormGroup;
  constForm: FormGroup;
  mathForm: FormGroup;
  testForm: FormGroup;
  inputs: FormArray;
  outputs: FormArray;
  constList: FormArray;
  expressions: FormArray;
  expressionList = [];
  inputChips = [];
  constChips = [];
  outputDialogChips = [];
  inputDialogChips = [];
  constDialogChips = [];
  operations = [];
  returnValueOutput: boolean;
  returnValueInput: boolean;
  returnValueConst: boolean;
  private toExpressionContainer = false;
  private fromExpressionContainer = false;
  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private dialog: MatDialog,
              private router: Router, private calculatorService: CalculatorService) {

  }
  ngOnInit() {
    this.inputsForm = this.formBuilder.group({
      inputs: this.formBuilder.array([this.createItem()], Validators.required)
    });

    this.outputForm = this.formBuilder.group({
      outputs: this.formBuilder.array([this.createItem()], Validators.required)
    });
    this.constForm = this.formBuilder.group({
      constList: this.formBuilder.array([])
    });
    this.informationForm = this.formBuilder.group({
      calcName: ['', Validators.required],
      calcDesc: ['', Validators.required]
    });
    this.mathForm = this.formBuilder.group({
      expressions: this.formBuilder.array([], Validators.required)
    });
    this.testForm = this.formBuilder.group( {
      testPass: ['']
    });
    this.cdRef.detectChanges();
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      symbol: [''],
      description: '',
      unit: ['']
    });
  }
   arrayToStringConverter(array): string {
    let exp = '';
    array.forEach( (value, key) => {
      exp = exp + value;
    });
    return exp;
  }
  validateExpression(expression: string): boolean {
    let result = false;
    let newExp = expression.slice(0, expression.length);
    this.inputDialogChips.forEach((input) => {
      if (newExp.includes(input.symbol)) {
        newExp = newExp.split(input.symbol).join('1');

      }
    });
    this.constDialogChips.forEach((constant) => {
      if (newExp.includes(constant.symbol)) {
        newExp = newExp.split(constant.symbol).join(constant.value.toString());
      }
    });
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
  createConstItem(): FormGroup {
    return this.formBuilder.group({
      symbol: [''],
      value: '',
      description: '',
      unit: ['']
    });
  }

  createExpression(symbolIn: string): FormGroup {
    return this.formBuilder.group({
      expression: '',
      symbol: symbolIn
    });
  }

  addItem(): void {
    this.inputs = this.inputsForm.get('inputs') as FormArray;
    this.inputs.push(this.createItem());
  }

  removeLastItem(): void {
    this.inputs = this.inputsForm.get('inputs') as FormArray;
    this.inputs.removeAt(this.inputs.length - 1);
  }

  addOutputItem(): void {
    this.outputs = this.outputForm.get('outputs') as FormArray;
    this.outputs.push(this.createItem());
  }

  removeOutputLastItem(): void {
    this.outputs = this.outputForm.get('outputs') as FormArray;
    this.outputs.removeAt(this.outputs.length - 1);
  }

  addConstItem(): void {
    this.constList = this.constForm.get('constList') as FormArray;
    this.constList.push(this.createConstItem());
  }

  removeConstLastItem(): void {
    this.constList = this.constForm.get('constList') as FormArray;
    this.constList.removeAt(this.constList.length - 1);
  }

  checkOutputSymbols(symbol: string): boolean {
    this.returnValueOutput = false;
    const arrayControl = this.outputForm.get('outputs') as FormArray;
    arrayControl.controls.forEach((item) => {
      if (item.get('symbol').value === symbol) {
        this.returnValueOutput = true;
      }
    });
    return this.returnValueOutput;
  }

  checkInputSymbols(symbol: string): boolean {
    this.returnValueInput = false;
    const arrayControl = this.inputsForm.get('inputs') as FormArray;
    arrayControl.controls.forEach((item) => {
      if (item.get('symbol').value === symbol) {
        this.returnValueInput = true;
      }
    });
    return this.returnValueInput;
  }

  checkConstSymbols(symbol: string): boolean {
    this.returnValueConst = false;
    const arrayControl = this.constForm.get('constList') as FormArray;
    arrayControl.controls.forEach((item) => {
      if (item.get('symbol').value === symbol) {
        this.returnValueConst = true;
      }
    });
    return this.returnValueConst;
  }
  defineAmountOfMathExp() {
    const arrayControl = this.outputForm.get('outputs') as FormArray;
    this.expressionList = [];
    this.expressions = this.mathForm.get('expressions') as FormArray;
    while (this.expressions.length !== 0) {
      this.expressions.removeAt(0);
    }
    arrayControl.controls.forEach((item) => {
      this.expressions.push(this.createExpression(item.get('symbol').value));
      this.expressionList.push({exp: [], valid: ''});
    });
  }
  drop(event: CdkDragDrop<string[]>, i: number) {
    this.toExpressionContainer = false;
    this.fromExpressionContainer = false;
    this.expressionList.forEach((value, key) => {
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
        this.expressionList[i].valid = 'true';
        console.log('valid true');
      } else {
        this.expressionList[i].valid = 'false';
        console.log('valid false');
      }
    }

  }
  public onStepChange(event: any): void {
    if (event.selectedIndex === 4) {
      this.defineAmountOfMathExp();
      this.openDialog();
      this.inputChips = [];
      this.constChips = [];
      const arrayControl = this.constForm.get('constList') as FormArray;
      arrayControl.controls.forEach((item) => {
        this.constChips.push(item.get('symbol').value);
        this.constDialogChips.push({symbol: item.get('symbol').value,
          description: item.get('description').value, value: item.get('value').value, unit: item.get('unit').value});
      });
      const arrayControl2 = this.inputsForm.get('inputs') as FormArray;
      arrayControl2.controls.forEach((item) => {
        this.inputChips.push(item.get('symbol').value);
        this.inputDialogChips.push({symbol: item.get('symbol').value,
          description: item.get('description').value, unit: item.get('unit').value});
      });
      const arrayControl3 = this.outputForm.get('outputs') as FormArray;
      arrayControl3.controls.forEach((item) => {
        this.outputDialogChips.push({symbol: item.get('symbol').value,
          description: item.get('description').value, unit: item.get('unit').value});
      });
    } else {
      this.dialog.closeAll();
    }
    if (event.selectedIndex === 5) {
      this.expressionList.forEach((exp, index) => {
        const output = this.outputDialogChips[index];
        const mathExp = this.arrayToStringConverter(exp.exp);
        const expression = mathExp;
        console.log('Expression: ' + expression);
        const inputs = [];
        const constants = [];
        this.inputDialogChips.forEach((input) => {
          if (expression.includes(input.symbol)) {
            inputs.push(input);
          }
        });
        this.constDialogChips.forEach((constant) => {
          if (expression.includes(constant.symbol)) {
            constants.push(constant);
          }
        });
        this.operations.push( {
          outputVal: output,
          inputsVal: inputs,
          constantsVal: constants,
          mathExpression: expression
        } );
      });
    }
  }
  onAcceptance() {
    console.log(this.operations);
    this.calculatorService.addCalculator(this.operations);
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.position = {
      top: '95px',
      right: '20px'
    };
    dialogConfig.data = {
      inputs: this.inputDialogChips,
      outputs: this.outputDialogChips,
      consts: this.constDialogChips
    };
    const dialogRef = this.dialog.open(VariablesDialogComponent, dialogConfig);
    this.router.events
      .subscribe(() => {
        dialogRef.close();
      });
  }
}

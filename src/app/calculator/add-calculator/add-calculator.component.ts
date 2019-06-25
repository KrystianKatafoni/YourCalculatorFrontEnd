import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) {
  }

  inputsForm: FormGroup;
  informationForm: FormGroup;
  outputForm: FormGroup;
  constForm: FormGroup;
  mathForm: FormGroup;
  inputs: FormArray;
  outputs: FormArray;
  constList: FormArray;
  expressions: FormArray;
  returnValueOutput: boolean;
  returnValueInput: boolean;
  returnValueConst: boolean;
  expressionList = [];
  inputChips = [];
  constChips = [];
  bin = [];
  mathOperators = ['+', '-', '*', '/', '(', ')', '[', ']'];
  private toExpressionContainer = false;
  private fromExpressionContainer = false;

  ngOnInit() {
    this.inputsForm = this.formBuilder.group({
      inputs: this.formBuilder.array([this.createItem()], Validators.required)
    });

    this.outputForm = this.formBuilder.group({
      outputs: this.formBuilder.array([this.createItem()], Validators.required)
    });
    this.constForm = this.formBuilder.group({
      constList: this.formBuilder.array([], Validators.required)
    });
    this.informationForm = this.formBuilder.group({
      calcName: ['', Validators.required],
      calcDesc: ['', Validators.required]
    });
    this.mathForm = this.formBuilder.group({
      expressions: this.formBuilder.array([], Validators.required)
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
      this.expressionList.push([]);
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    this.toExpressionContainer = false;
    this.fromExpressionContainer = false;
    this.expressionList.forEach((value, key) => {
      if (value === event.container.data) {
        this.toExpressionContainer = true;

      }
      if (value === event.previousContainer.data) {
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
    }

  }

  public onStepChange(event: any): void {
    if (event.selectedIndex === 4) {
      this.defineAmountOfMathExp();
      this.inputChips = [];
      this.constChips = [];
      const arrayControl = this.constForm.get('constList') as FormArray;
      arrayControl.controls.forEach((item) => {
        this.constChips.push(item.get('symbol').value);
      });
      const arrayControl2 = this.inputsForm.get('inputs') as FormArray;
      arrayControl2.controls.forEach((item) => {
        this.inputChips.push(item.get('symbol').value);
      });
    }
  }
}

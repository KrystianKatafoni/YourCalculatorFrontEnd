import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-calculator',
  templateUrl: './add-calculator.component.html',
  styleUrls: ['./add-calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCalculatorComponent implements OnInit {
  symbolsInput = 'iA,iB,iC,iD,iE,iF,iG,iH,iI,iJ,iK,iL,iM,iN,iO,iP,iR,iS,iT,iU,iW,iX,iY,iZ'.split(',');
  symbolsOutput = 'oA,oB,oC,oD,oE,oF,oG,oH,oI,oJ,oK,oL,oM,oN,oO,oP,oR,oS,oT,oU,oW,oX,oY,oZ'.split(',');
  symbolsConst = 'cA,cB,cC,cD,cE,cF,cG,cH,cI,cJ,cK,cL,cM,cN,cO,cP,cR,cS,cT,cU,cW,cX,cY,cZ'.split(',');
  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) {}
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
  ngOnInit() {
    this.inputsForm = this.formBuilder.group({
      inputs: this.formBuilder.array([this.createItem()], Validators.required)
    });

    this.outputForm = this.formBuilder.group({
      outputs: this.formBuilder.array([this.createItem()], Validators.required)
    });
    this.constForm = this.formBuilder.group({
      constList: this.formBuilder.array([this.createItem()], Validators.required)
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
  createExpression(symbolIn: string): FormGroup {
    return this.formBuilder.group( {
      expression: '',
      symbol: [{
        value: symbolIn,
        disabled: true
      }]
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
    this.constList.push(this.createItem());
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
    arrayControl.controls.forEach((item) => {
      this.expressions = this.mathForm.get('expressions') as FormArray;
      this.expressions.push(this.createExpression(item.get('symbol').value));
    });
  }
}

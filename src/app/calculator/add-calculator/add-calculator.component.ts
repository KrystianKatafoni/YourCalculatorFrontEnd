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
  mathForm: FormGroup;
  inputs: FormArray;
  outputs: FormArray;
  returnValue: boolean;
  ngOnInit() {
    this.inputsForm = this.formBuilder.group({
      inputs: this.formBuilder.array([this.createItem()], Validators.required)
    });

    this.outputForm = this.formBuilder.group({
      outputs: this.formBuilder.array([this.createItem()], Validators.required)
    });
    this.informationForm = this.formBuilder.group({
      calcName: ['', Validators.required],
      calcDesc: ['', Validators.required]
    });
    this.mathForm = this.formBuilder.group({
      exp: ['', Validators.required]
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
  checkSymbol(symbol: string): boolean {
    this.returnValue = false;
    const arrayControl = this.outputForm.get('outputs') as FormArray;
    arrayControl.controls.forEach((item) => {
      if (item.get('symbol').value === symbol) {
        this.returnValue = true;
      }
    });
    return this.returnValue;
  }
}

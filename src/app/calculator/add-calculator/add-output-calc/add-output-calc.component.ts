import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-output-calc',
  templateUrl: './add-output-calc.component.html',
  styleUrls: ['./add-output-calc.component.css']
})
export class AddOutputCalcComponent implements OnInit {
  outputForm: FormGroup;
  outputList: FormArray;
  symbolsOutput = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s,t,u,w,x,y,z'.split(',');
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.outputForm = this.fb.group({
      outputList: this.fb.array([this.createItem()], Validators.required)
    });
  }
  createItem(): FormGroup {
    return this.fb.group({
      symbol: {value: this.assignSymbol(), disabled: true},
      name: '',
      unit: '',
      description: ''
    });
  }
  assignSymbol(): string {
    let length;
    if (this.outputList != null) {
      length = this.outputList.length;
    } else {
      length = 0;
    }
    return this.symbolsOutput[length];
  }
  addItem(): void {
    this.outputList = this.outputForm.get('outputList') as FormArray;
    this.outputList.push(this.createItem());
  }

  removeLastItem(): void {
    this.outputList = this.outputForm.get('outputList') as FormArray;
    this.outputList.removeAt(this.outputList.length - 1);
  }
}

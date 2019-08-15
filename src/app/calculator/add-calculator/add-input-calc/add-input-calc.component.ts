import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-input-calc',
  templateUrl: './add-input-calc.component.html',
  styleUrls: ['./add-input-calc.component.css']
})
export class AddInputCalcComponent implements OnInit {
  inputForm: FormGroup;
  inputList: FormArray;
  symbolsInput = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s,t,u,w,x,y,z'.split(',');
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.inputForm = this.fb.group({
      inputList: this.fb.array([this.createItem()], Validators.required)
    });
  }
  assignSymbol(): string {
    let length;
    if (this.inputList != null) {
      length = this.inputList.length;
    } else {
      length = 0;
    }
    return this.symbolsInput[length];
  }
  createItem(): FormGroup {
    return this.fb.group({
      symbol: {value: this.assignSymbol(), disabled: true},
      name: '',
      unit: '',
      description: ''
    });
  }
  addItem(): void {
    this.inputList = this.inputForm.get('inputList') as FormArray;
    this.inputList.push(this.createItem());
  }

  removeLastItem(): void {
    this.inputList = this.inputForm.get('inputList') as FormArray;
    this.inputList.removeAt(this.inputList.length - 1);
  }
}

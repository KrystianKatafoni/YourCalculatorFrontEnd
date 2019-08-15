import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-const-calc',
  templateUrl: './add-const-calc.component.html',
  styleUrls: ['./add-const-calc.component.css']
})
export class AddConstCalcComponent implements OnInit {
  constForm: FormGroup;
  constList: FormArray;
  symbolsConst = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s,t,u,w,x,y,z'.split(',');
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.constForm = this.fb.group({
      constList: this.fb.array([])
    });
  }
  assignSymbol(): string {
   return this.symbolsConst[this.constList.length];
  }
  createConstItem(): FormGroup {
    return this.fb.group({
      symbol: {value: this.assignSymbol(), disabled: true},
      value: '',
      name: '',
      unit: ['']
    });
  }
  addConstItem(): void {
    this.constList = this.constForm.get('constList') as FormArray;
    this.constList.push(this.createConstItem());
  }

  removeConstLastItem(): void {
    this.constList = this.constForm.get('constList') as FormArray;
    this.constList.removeAt(this.constList.length - 1);
  }

}

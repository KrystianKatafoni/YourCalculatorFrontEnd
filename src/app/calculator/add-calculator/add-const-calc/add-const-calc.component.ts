import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UnitStorageService} from '../../../shared/storage/unit-storage.service';
import {UnitCategoryModel} from "../../../shared/model/unitCategory.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-const-calc',
  templateUrl: './add-const-calc.component.html',
  styleUrls: ['./add-const-calc.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddConstCalcComponent implements OnInit {
  constForm: FormGroup;
  constList: FormArray;
  units: Array<UnitCategoryModel>;
  symbolsConst = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s,t,u,w,x,y,z'.split(',');
  constructor(private fb: FormBuilder, private us: UnitStorageService, private cdRef: ChangeDetectorRef) {
    this.units = us.getUnits();
  }
  getConstList(): FormArray {
    return this.constForm.get('constList') as FormArray;
  }
  ngOnInit() {
    this.constForm = this.fb.group({
      constList: this.fb.array([])
    });
    this.cdRef.detectChanges();
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    console.log(e);
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
      (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
      (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
      (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
      (e.keyCode >= 35 && e.keyCode <= 39) // Home, End, Left, Right
    ) {
      return;  // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode !== 190))) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  }
  assignSymbol(): string {
   return this.symbolsConst[this.constList.length];
  }
  createConstItem(): FormGroup {
    return this.fb.group({
      symbol: {value: this.assignSymbol(), disabled: true},
      value: '',
      description: '',
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

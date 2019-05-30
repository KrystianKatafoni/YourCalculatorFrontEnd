import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-calculator',
  templateUrl: './add-calculator.component.html',
  styleUrls: ['./add-calculator.component.css']
})
export class AddCalculatorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  inputsForm: FormGroup;
  informationForm: FormGroup;
  outputForm: FormGroup;
  mathForm: FormGroup;

  inputs: FormArray;
  ngOnInit() {
    this.inputsForm = this.formBuilder.group({
      inputs: this.formBuilder.array([this.createItem()])
    });
    this.informationForm = this.formBuilder.group({
      calcName: ['', Validators.required],
      calcDesc: ['', Validators.required]
    });
    this.outputForm = this.formBuilder.group({
      symbol: ['', Validators.required],
      description: ['', Validators.required],
      unit: ['', Validators.required]
    });
    this.mathForm = this.formBuilder.group({
      exp: ['', Validators.required]
    });
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
}

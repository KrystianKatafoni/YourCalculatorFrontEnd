import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-info-calc',
  templateUrl: './add-info-calc.component.html',
  styleUrls: ['./add-info-calc.component.css']
})
export class AddInfoCalcComponent implements OnInit {
  informationForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.informationForm = this.formBuilder.group({
      calcName: ['', Validators.required],
      calcDesc: ['', Validators.required],
      owner: ['', Validators.required]
    });
  }

}

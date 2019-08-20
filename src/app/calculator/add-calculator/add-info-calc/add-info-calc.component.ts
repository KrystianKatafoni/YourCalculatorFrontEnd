import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryStorageService} from "../../../shared/storage/category-storage.service";
import {Observable} from "rxjs";
import {CategoryModel} from "../../../shared/model/category.model";

@Component({
  selector: 'app-add-info-calc',
  templateUrl: './add-info-calc.component.html',
  styleUrls: ['./add-info-calc.component.css']
})
export class AddInfoCalcComponent implements OnInit {
  informationForm: FormGroup;
  categories: Observable<CategoryModel[]>;
  constructor(private formBuilder: FormBuilder, private cs: CategoryStorageService) { }

  ngOnInit() {
    this.informationForm = this.formBuilder.group({
      calcName: ['', Validators.required],
      calcDesc: [''],
      owner: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.categories = this.cs.getCategories();
  }

}

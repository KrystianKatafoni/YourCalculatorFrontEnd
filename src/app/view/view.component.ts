import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CalculatorStorageService} from "../shared/storage/calculator-storage.service";
import {CalculatorModel} from "../shared/model/calculator.model";
import {faCalculator} from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  id: string;
  calculator = faCalculator;
  private sub: any;
  calculatorWithId: {key: string, data: CalculatorModel};
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {

  }

  ngOnInit() {
    let id;
    const con: {key: string, data: CalculatorModel}[] = this.route.snapshot.data.calculator;
    this.route.params.subscribe(
      (params) => {
        id = params['id'];
      });
    this.calculatorWithId = con.filter(item => item.key === id)[0];

  }

  ngOnDestroy(): void {

  }

}

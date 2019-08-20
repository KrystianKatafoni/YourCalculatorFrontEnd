import { Injectable } from '@angular/core';
import {CalculatorInfoModel} from '../../../shared/model/calculator-info.model';

@Injectable({
  providedIn: 'root'
})
export class AddInfoCalcService {
  info: CalculatorInfoModel;
  constructor() {
    this.info = new CalculatorInfoModel();
  }
  addCalculatorInfoModel(name: string, description: string, owner: string) {

    this.info.name = name;
    this.info.description = description;
    this.info.owner = owner;
  }
  getCalculatorInfoModel(): CalculatorInfoModel {
      return this.info;
  }
}

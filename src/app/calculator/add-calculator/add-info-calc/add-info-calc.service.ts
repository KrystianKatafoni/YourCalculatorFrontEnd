import { Injectable } from '@angular/core';
import {CalculatorInfoModel} from "../../../shared/calculator-info.model";

@Injectable({
  providedIn: 'root'
})
export class AddInfoCalcService {
  info: CalculatorInfoModel;
  constructor() {
    this.info = new CalculatorInfoModel('','','');
  }
  addCalculatorInfoModel(name: string, description: string, owner: string) {
    this.info = new CalculatorInfoModel(name, description, owner);
  }
  getCalculatorInfoModel(): CalculatorInfoModel {
      return this.info;
  }
}

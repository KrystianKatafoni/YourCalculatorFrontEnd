import { Injectable } from '@angular/core';
import {CalculatorInfoModel} from "../../../shared/calculator-info.model";
import {ConstantValueModel} from "../../../shared/constantValue.model";

@Injectable({
  providedIn: 'root'
})
export class AddConstCalcService {
  constants: Array<ConstantValueModel>;
  constructor() {
  }
  addArrayOfConstants(constants: Array<ConstantValueModel>) {
    this.constants = constants;
  }
  addConstatnt(constant: ConstantValueModel) {
    this.constants.push(constant);
  }
  getArrayOfConstants(): Array<ConstantValueModel> {
    return this.constants;
  }
}

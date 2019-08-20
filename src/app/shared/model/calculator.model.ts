import {ExpressionModel} from './expression.model';
import {CalculatorInfoModel} from './calculator-info.model';
import {InputValueModel} from './inputValue.model';
import {OutputValueModel} from './outputValue.model';
import {ConstantValueModel} from './constantValue.model';

export class CalculatorModel {
  information = new CalculatorInfoModel();
  inputs: InputValueModel[] = [];
  outputs: OutputValueModel[] = [];
  constants: ConstantValueModel[] = [];
  constructor() {
  }
}

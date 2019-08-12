
import {InputValueModel} from "./inputValue.model";
import {OutputValueModel} from "./outputValue.model";
import {ConstantValueModel} from "./constantValue.model";

export class ExpressionModel {
  expression: string;
  inputs: Array<InputValueModel>;
  outputs: Array<OutputValueModel>;
  constants: Array<ConstantValueModel>;
}

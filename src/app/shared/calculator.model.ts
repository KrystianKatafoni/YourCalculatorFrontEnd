import {ConstantValueModel} from "./constantValue.model";
import {ExpressionModel} from "./expression.model";

export class CalculatorModel {
  name: string;
  description: string;
  expressions: Array<ExpressionModel>;
}

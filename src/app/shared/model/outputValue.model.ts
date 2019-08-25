import {ExpressionModel} from './expression.model';

export class OutputValueModel {
  name = '';
  symbol = '';
  description = '';
  unit = '';
  expression = [];
  type = 'output';
  value = '';
  constructor() {}
  getExpressionAsString(): string {
    let expressionStr = '';
    this.expression.forEach((item) => {
      expressionStr = expressionStr + item.name;
    });
    return  expressionStr;
  }

}

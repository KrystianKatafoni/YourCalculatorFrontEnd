import {UnitModel} from './unit.model';
import {Observable} from 'rxjs';

export class UnitCategoryModel {
  categoryName: string;
  units: Observable<UnitModel[]>;

  constructor(categoryName: string, units: Observable<UnitModel[]>) {
    this.categoryName = categoryName;
    this.units = units;
  }
}

import {Injectable} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot} from "@angular/router";
import {CalculatorStorageService} from "../shared/storage/calculator-storage.service";
import {CalculatorModel} from "../shared/model/calculator.model";
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/database";
import {map, take} from "rxjs/operators";

@Injectable()
export class ViewResolver implements Resolve< Observable<{key: string, data: CalculatorModel}[]> > {

  constructor(private cs: CalculatorStorageService) {
  }

  resolve(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<{key: string, data: CalculatorModel}[]> {
    return this.cs.getCalculators().pipe(take(1));
  }
}

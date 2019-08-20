import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Observable} from "rxjs";
import {CategoryModel} from "../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryStorageService {

  categoryList: AngularFireList<CategoryModel>;
  categoryData: Observable<CategoryModel[]>;

  constructor(private db: AngularFireDatabase) {
    this.categoryList = this.db.list<CategoryModel>('/calc-categories');
    this.categoryData = this.categoryList.valueChanges();

  }
  getCategories(): Observable<CategoryModel[]> {
    return this.categoryData;
  }
}

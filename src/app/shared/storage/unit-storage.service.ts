import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs';

import {UnitModel} from '../model/unit.model';
import {UnitCategoryModel} from '../model/unitCategory.model';


@Injectable({
  providedIn: 'root'
})
export class UnitStorageService {
  areaList: AngularFireList<UnitModel>;
  electricList: AngularFireList<UnitModel>;
  lengthList: AngularFireList<UnitModel>;
  physicsList: AngularFireList<UnitModel>;
  timeList: AngularFireList<UnitModel>;
  volumeList: AngularFireList<UnitModel>;
  weightList: AngularFireList<UnitModel>;
  areaData: Observable<UnitModel[]>;
  electricData: Observable<UnitModel[]>;
  lengthData: Observable<UnitModel[]>;
  physicsData: Observable<UnitModel[]>;
  timeData: Observable<UnitModel[]>;
  volumeData: Observable<UnitModel[]>;
  weightData: Observable<UnitModel[]>;
  constructor(private db: AngularFireDatabase) {
    this.areaList = this.db.list<UnitModel>('/units/area');
    this.electricList = this.db.list<UnitModel>('/units/electric');
    this.lengthList = this.db.list<UnitModel>('/units/length');
    this.physicsList = this.db.list<UnitModel>('/units/physics');
    this.timeList = this.db.list<UnitModel>('/units/time');
    this.volumeList = this.db.list<UnitModel>('/units/volume');
    this.weightList = this.db.list<UnitModel>('/units/weight');

    this.areaData = this.areaList.valueChanges();
    this.electricData = this.electricList.valueChanges();
    this.lengthData =  this.lengthList.valueChanges();
    this.physicsData = this.physicsList.valueChanges();
    this.timeData = this.timeList.valueChanges();
    this.volumeData =  this.volumeList.valueChanges();
    this.weightData =  this.weightList.valueChanges();
  }
  getUnits(): Array<UnitCategoryModel> {
    const units = [new UnitCategoryModel('weight', this.weightData),
      new UnitCategoryModel('length', this.lengthData),
      new UnitCategoryModel('area', this.areaData),
      new UnitCategoryModel('time', this.timeData),
      new UnitCategoryModel('electric', this.electricData),
      new UnitCategoryModel('physics', this.physicsData),
      new UnitCategoryModel('volume', this.volumeData),
      ];
    return units;
  }
}

import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CalculatorStorageService} from "../shared/storage/calculator-storage.service";
import {CalculatorModel} from "../shared/model/calculator.model";
import {ActivatedRoute} from "@angular/router";
import {MatSort} from "@angular/material";
import {MatTableDataSource} from "@angular/material";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['index', 'name', 'owner', 'desc'];
  calculators: { key: string, data: CalculatorModel}[];
  dataSource;
  constructor( private cs: CalculatorStorageService, private route: ActivatedRoute) {

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  ngOnInit() {
    const con: { key: string, data: CalculatorModel }[] = this.route.snapshot.data.calculators;
    this.calculators = con;
    this.dataSource = new MatTableDataSource(this.calculators);
    console.log(this.dataSource);
  }

  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}

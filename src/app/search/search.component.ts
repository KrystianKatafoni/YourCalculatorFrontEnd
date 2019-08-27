import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CalculatorStorageService} from "../shared/storage/calculator-storage.service";
import {CalculatorModel} from "../shared/model/calculator.model";
import {ActivatedRoute} from "@angular/router";
import {MatSort} from "@angular/material";
import {MatTableDataSource} from "@angular/material";
import {MatPaginator} from "@angular/material/paginator";
import {faLink} from "@fortawesome/free-solid-svg-icons";

export interface CalculatorTableInfo {
  name: string;
  owner: string;
  description: string;
  category: string;
  key: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['index', 'name', 'owner', 'category', 'description', 'key', 'link'];
  calculators: Array<CalculatorTableInfo>;
  dataSource;
  link = faLink;
  constructor( private cs: CalculatorStorageService, private route: ActivatedRoute) {

  }
  public doFilter = (value) => {
    console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  ngOnInit() {
    const con: { key: string, data: CalculatorModel }[] = this.route.snapshot.data.calculators;
    this.calculators = con.map( item => {
      return { name: item.data.information.name, owner: item.data.information.owner,
        description: item.data.information.description, category: item.data.information.category, key: item.key};
    })
    console.log(this.calculators)
    this.dataSource = new MatTableDataSource(this.calculators);
  }

  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}

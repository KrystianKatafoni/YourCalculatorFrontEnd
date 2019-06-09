import { Component, OnInit } from '@angular/core';
import {faAtom} from '@fortawesome/free-solid-svg-icons/faAtom';
import {faSortAmountDown} from '@fortawesome/free-solid-svg-icons';
import {faSubscript} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  atom = faAtom;
  sort = faSortAmountDown;
  sub = faSubscript;
  constructor() { }

  ngOnInit() {
  }

}

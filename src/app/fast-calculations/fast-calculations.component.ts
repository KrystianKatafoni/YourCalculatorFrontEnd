import { Component, OnInit } from '@angular/core';
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fast-calculations',
  templateUrl: './fast-calculations.component.html',
  styleUrls: ['./fast-calculations.component.css']
})
export class FastCalculationsComponent implements OnInit {
  tachometer = faTachometerAlt;
  constructor() { }

  ngOnInit() {
  }

}

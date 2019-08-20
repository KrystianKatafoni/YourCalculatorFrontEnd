import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../environments/environment';
import {faSquareRootAlt} from '@fortawesome/free-solid-svg-icons';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faCalculator} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faCopyright} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faRocket} from '@fortawesome/free-solid-svg-icons/faRocket';
import {faSortNumericUp} from '@fortawesome/free-solid-svg-icons/faSortNumericUp';
import {CalculatorStorageService} from "./shared/storage/calculator-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  square = faSquareRootAlt;
  home = faHome;
  calculator = faCalculator;
  search = faSearch;
  info = faInfo;
  envelope = faEnvelope;
  copyright = faCopyright;
  heart = faHeart;
  rocket = faRocket;
  sortNumeric = faSortNumericUp;
  title = 'YourCalculatorFrontEnd';

  constructor(private cs: CalculatorStorageService) {
  }
}

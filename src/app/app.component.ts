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
import {faInfinity} from '@fortawesome/free-solid-svg-icons';

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
  infinity = faInfinity;
  title = 'YourCalculatorFrontEnd';

  constructor(private httpClient: HttpClient) {
  }
  onSend() {
    const formula = {
      expression: 'Math.pow((a+b+c),3)',
      values: {
        a: 2.0,
        b: 3.9,
        c: 4.56
      }
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const httpRequest = new HttpRequest('POST', (environment.baseUrl + '/api/v1/executor'), formula, httpOptions);
    this.httpClient.request(httpRequest).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}

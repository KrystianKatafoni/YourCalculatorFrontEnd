import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FastCalculatorService {
  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})
  sendExpToServer(exp: string) {
    return this.httpClient.post('http://localhost:8080/api/v1/executor/expression', { value: exp}, {headers: this.headers});
  }
}

import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor() { }
  facebook = faFacebook;
  google = faGoogle;
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form);
  }
}

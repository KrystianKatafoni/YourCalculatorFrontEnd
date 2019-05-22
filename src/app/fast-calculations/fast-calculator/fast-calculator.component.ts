import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {SimpleDialogComponent} from './simple-dialog/simple-dialog.component';
import {CustomDialogComponent} from './custom-dialog/custom-dialog.component';
import {FastCalculatorService} from './fast-calculator.service';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-fast-calculator',
  templateUrl: './fast-calculator.component.html',
  styleUrls: ['./fast-calculator.component.css']
})
export class FastCalculatorComponent implements OnInit {
  animal: string;
  name: string;
  infoCircle = faInfoCircle;
  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private fastCalculatorService: FastCalculatorService) { }
  @ViewChild('fs') signupFormSimple: NgForm;
  @ViewChild('fc') signupFormCustom: NgForm;
  expressionSimple: string;
  expressionCustom: string;
  simpleResult: number;
  customResult: number;
  ngOnInit() {
  }
  onSubmitSimple() {
    this.expressionSimple = this.signupFormSimple.value.simpleExp;
    this.fastCalculatorService.sendExpToServer(this.expressionSimple).subscribe( (data: number) => {this.simpleResult = data; });
    console.log(this.signupFormSimple);
    const mess = 'Expression: ' + this.expressionSimple;
    this.snackBar.open('Simple calculator', mess, {duration: 2000, panelClass: 'snackbar-class'});
  }
  onSubmitCustom() {
    console.log(this.signupFormSimple);
    this.expressionCustom = this.signupFormCustom.value.customExp;
    const mess = 'Expression: ' + this.expressionCustom;
    this.snackBar.open('Custom calculator', mess, {duration: 2000, panelClass: 'snackbar-class'});
  }
  openSimpleDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(SimpleDialogComponent, dialogConfig);
  }
  openCustomDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CustomDialogComponent, dialogConfig);
  }
}


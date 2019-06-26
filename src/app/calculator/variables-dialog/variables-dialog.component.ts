import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-variables-dialog',
  templateUrl: './variables-dialog.component.html',
  styleUrls: ['./variables-dialog.component.css']
})
export class VariablesDialogComponent implements OnInit {
  inputs = [];
  outputs = [];
  consts = [];
  constructor(private dialogRef: MatDialogRef<VariablesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.inputs = data.inputs;
      this.outputs = data.outputs;
      this.consts = data.consts;
    }
  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
}

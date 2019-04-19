import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CustomDialogComponent>) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
}

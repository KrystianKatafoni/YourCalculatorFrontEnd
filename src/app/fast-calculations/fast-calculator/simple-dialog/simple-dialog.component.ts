import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})
export class SimpleDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SimpleDialogComponent>) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
}

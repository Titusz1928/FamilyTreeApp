import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ftapp-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  dialogRef: MatDialogRef<InfoDialogComponent>;

  constructor(dialogRef: MatDialogRef<InfoDialogComponent>) {
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

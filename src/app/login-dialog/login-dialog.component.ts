import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ftapp-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  password:string="test";
  canEdit:boolean=false;

  onSubmit(form: any): void {
    const enteredPassword = form.value.password;
    console.log(enteredPassword);
    if (enteredPassword === this.password) {
      console.log("Privileges granted");
      this.canEdit=true;
      form.reset();
      this.dialogRef.close(this.canEdit); 
    } else {
      console.log("Incorrect password");
    }
    form.reset(); // Reset the form after submission
  }

  dialogRef: MatDialogRef<LoginDialogComponent>;

  constructor(dialogRef: MatDialogRef<LoginDialogComponent>) {
    this.dialogRef = dialogRef;
    this.canEdit=false;
  }

  ngOnInit(): void { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

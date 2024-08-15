import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { EditModeService } from '../services/edit-mode.service';

@Component({
  selector: 'ftapp-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  canEdit: boolean = false;

  constructor(private dialog: MatDialog, private editModeService: EditModeService) { }

  ngOnInit(): void { }

  saveData(): void {
    this.canEdit = false;
    this.editModeService.setCanEdit(false); // Update the service to notify other components
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      // Update the component's canEdit property
      this.canEdit = result === true;
      this.editModeService.setCanEdit(this.canEdit); // Update the service with the new value
      console.log('The dialog was closed');
      console.log('canEdit:', this.canEdit);
    });
  }

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(InfoDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}

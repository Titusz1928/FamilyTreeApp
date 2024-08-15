import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { FormsModule } from '@angular/forms';
import { DesktopComponent } from './desktop/desktop.component';
import { PersonCardComponent } from './person-card/person-card.component';
import { BottomCardComponent } from './bottom-card/bottom-card.component';
import { TreeAreaComponent } from './tree-area/tree-area.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginDialogComponent,
    InfoDialogComponent,
    DesktopComponent,
    PersonCardComponent,
    BottomCardComponent,
    TreeAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSliderModule,
    MatTabsModule,
    MatCardModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

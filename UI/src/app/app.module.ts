import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMedicinesComponent } from './components/add-medicines/add-medicines.component';
import { MedicinesDetailsComponent } from './components/medicines-details/medicines-details.component';
import { MedicinesListComponent } from './components/medicines-list/medicines-list.component';

import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

@NgModule({
  declarations: [
    AppComponent,
    AddMedicinesComponent,
    MedicinesDetailsComponent,
    MedicinesListComponent,
    jqxGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

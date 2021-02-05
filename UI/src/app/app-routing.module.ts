import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinesListComponent } from './components/medicines-list/medicines-list.component';
import { MedicinesDetailsComponent } from './components/medicines-details/medicines-details.component';
import { AddMedicinesComponent } from './components/add-medicines/add-medicines.component';

const routes: Routes = [
  { path: '', redirectTo: 'medicines', pathMatch: 'full' },
  { path: 'medicines', component: MedicinesListComponent },
  { path: 'medicines/:id', component: MedicinesDetailsComponent },
  { path: 'add', component: AddMedicinesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

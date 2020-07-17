import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainersConfigComponent } from './trainers-config/trainers-config.component';
import { ResultsComponent } from './results/results.component';


const routes: Routes = [

  { path: '', redirectTo: '/configuration', pathMatch: 'full'},
  { path: 'configuration', component: TrainersConfigComponent },
  { path: 'results', component: ResultsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

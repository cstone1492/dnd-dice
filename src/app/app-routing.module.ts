import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { FormComponent } from './form/form.component';
import { ChiSquareFormComponent } from './chi-square-form/chi-square-form.component';
import { CreateDieSetComponent } from './create-die-set/create-die-set.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';


const routes: Routes = [
  {path: 'user-data', component: UserDataComponent},
  {path: 'form', component: FormComponent},
  {path: 'chi-square-form', component: ChiSquareFormComponent},
  {path: 'create-die-set', component: CreateDieSetComponent},
  {path: 'dice-roller', component: DiceRollerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

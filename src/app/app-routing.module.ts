import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { FormComponent } from './form/form.component';
import { ChiSquareFormComponent } from './chi-square-form/chi-square-form.component';
import { CreateDieSetComponent } from './create-die-set/create-die-set.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import { MultiDiceRollerComponent } from './multi-dice-roller/multi-dice-roller.component';
import { DieSetComponent } from './die-set/die-set.component';


const routes: Routes = [
  {path: 'user-data', component: UserDataComponent},
  {path: 'form', component: FormComponent},
  {path: 'chi-square-form', component: ChiSquareFormComponent},
  {path: 'create-die-set', component: CreateDieSetComponent},
  {path: 'dice-roller', component: DiceRollerComponent},
  {path: 'multi-dice-roller', component: MultiDiceRollerComponent},
  {path: 'die-set', component: DieSetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

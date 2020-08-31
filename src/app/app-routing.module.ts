import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { FormComponent } from './form/form.component';
import { ChiSquareFormComponent } from './chi-square-form/chi-square-form.component';
import { CreateDieSetComponent } from './create-die-set/create-die-set.component';


const routes: Routes = [
  {path: 'user-data', component: UserDataComponent},
  {path: 'form', component: FormComponent},
  {path: 'chi-square-form', component: ChiSquareFormComponent},
  {path: 'create-die-set', component: CreateDieSetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

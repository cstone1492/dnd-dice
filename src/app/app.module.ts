import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import { UserDataComponent } from './user-data/user-data.component';
import { FormComponent } from './form/form.component';
import { ChiSquareFormComponent } from './chi-square-form/chi-square-form.component';
import { CreateDieSetComponent } from './create-die-set/create-die-set.component';
import { DieSetsComponent } from './die-sets/die-sets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    FormComponent,
    ChiSquareFormComponent,
    CreateDieSetComponent,
    DieSetsComponent,
    HeaderComponent,
    FooterComponent,
    DiceRollerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

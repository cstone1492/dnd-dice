import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import { UserDataComponent } from './user-data/user-data.component';
import { FormComponent } from './form/form.component';
import { ChiSquareFormComponent } from './chi-square-form/chi-square-form.component';
import { CreateDieSetComponent } from './form/create-die-set/create-die-set.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    FormComponent,
    ChiSquareFormComponent,
    CreateDieSetComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

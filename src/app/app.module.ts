import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OktaAuthModule } from '@okta/okta-angular';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import { UserDataComponent } from './user-data/user-data.component';
import { FormComponent } from './form/form.component';
import { ChiSquareFormComponent } from './chi-square-form/chi-square-form.component';
import { CreateDieSetComponent } from './form/create-die-set/create-die-set.component';

OktaAuthModule.initAuth({
  issuer: 'https://dev-853984-admin.okta.com/dev/console',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '{0oaqnijtxJZyDdJou4x6}'
})

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    FormComponent,
    ChiSquareFormComponent,
    CreateDieSetComponent
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

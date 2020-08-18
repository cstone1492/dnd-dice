import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard } from '@okta/okta-angular';
import { ProtectedComponent } from './protected/protected.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StorageServiceModule} from 'angular-webstorage-service';
import { UserDataComponent } from './user-data/user-data.component';
import { FormComponent } from './form/form.component';
import { ChiSquareFormComponent } from './chi-square-form/chi-square-form.component';
import { CreateDieSetComponent } from './form/create-die-set/create-die-set.component';


const config = {
  issuer: 'https://dev-853984.okta.comDashboard/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oaqnijtxJZyDdJou4x6',
  pkce: true
}

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const appRoutes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  }
]

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    FormComponent,
    ChiSquareFormComponent,
    CreateDieSetComponent,
    ProtectedComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    FormsModule,
    OktaAuthModule,
  ],
  providers: [
    {
      provide: OKTA_CONFIG, useValue: config
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated: boolean

  title = 'DND Dice Tracker';

  public data:any=[]

  dieTypes: any = [
    '4',
    '6',
    '8',
    '10',
    '12',
    '20'
  ]

  dieTypesValue() {
    return this.dieTypes;
  }

  /*constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
  }*/
  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect('/profile');
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }
}
  



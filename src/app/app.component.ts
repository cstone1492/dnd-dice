import { Component, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  dieSets: any [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {

  }

  dieTypesValue() {
    return this.dieTypes;
  }
  
}

import { Component, OnInit, NgModule } from '@angular/core';
import { DiceRollerComponent } from '../dice-roller/dice-roller.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DiceRollerComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
})

@Component({
  selector: 'app-multi-dice-roller',
  templateUrl: './multi-dice-roller.component.html',
  styleUrls: ['./multi-dice-roller.component.css']
})
export class MultiDiceRollerComponent implements OnInit {

  multi = false;
  numberDie = 0;

  constructor() { }

  ngOnInit() {
  }

  multiRoll() {
    this.multi = true;
  }

}

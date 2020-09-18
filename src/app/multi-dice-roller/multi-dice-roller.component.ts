import { Component, OnInit, NgModule } from '@angular/core';
import { DiceRollerComponent } from '../dice-roller/dice-roller.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

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
  multiSelected = false;
  numberDie = 0;
  Arr = Array;
  num:number = 2;
  numbers: any[] = [];

  constructor(public fb:FormBuilder) { }

  ngOnInit() {
    this.populateNumbers(10);
    console.log(this.numbers);
  }

  dieNumberForm = this.fb.group({
    name: ['']
  })

  multiRoll() {
    this.multi = true;
  }

  populateNumbers(upperLimit) {
    for (let i = 0; i <= upperLimit; i ++) {
      this.numbers.push(i);
    }
  }

  dieNumberSubmit() {
    this.num=Number(this.dieNumberForm.value['name']);
    this.multiSelected = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.css']
})

export class DiceRollerComponent implements OnInit {

  dieTypes = ['4','6','8','10','12','20']

  dieType;

  dieRolled = false;

  rollValue = 0;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
  }

  rollDieForm = this.fb.group({
    name: ['']
  })

  rollDie(form: NgForm) {
    this.dieType = Number(this.rollDieForm.value['name']);
    this.dieRolled = true;
    this.rollValue = Math.round(Math.random()*this.dieType);
  }

}


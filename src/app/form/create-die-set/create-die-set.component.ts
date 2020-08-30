import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { formatCurrency } from '@angular/common';
//import { AppComponent } from './app.component'
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-die-set',
  templateUrl: './create-die-set.component.html',
  styleUrls: ['./create-die-set.component.css']
})
export class CreateDieSetComponent implements OnInit {
  dieTypes: any = [
    '4',
    '6',
    '8',
    '10',
    '12',
    '20'
  ]
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    let rollValue = form.value.rollValue;
    let selectedDieType = form.value.dieType;
    let existing = localStorage.getItem(`${selectedDieType}`);
    let existingArray = existing ? existing.split(',') : [];
    existingArray.push(rollValue);
    localStorage.setItem(selectedDieType, existingArray.toString());
    form.reset();
  }
}

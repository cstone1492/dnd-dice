import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { formatCurrency } from '@angular/common';
import { AppComponent } from '../app.component'
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  selectedDieType: string = '';

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

  dieTypeChangeHandler (event: any) {
    this.selectedDieType = event.target.value;
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value)
  }
  saveInLocal (dieRoll: string) {
    console.log(this.selectedDieType);
    let existing = localStorage.getItem(`${this.selectedDieType}`);
    console.log(existing);
    let existingArray = existing ? existing.split(',') : [];
    console.log(existingArray);
    existingArray.push(dieRoll);
    console.log(existingArray);
    localStorage.setItem(this.selectedDieType, existingArray.toString());

  }
}

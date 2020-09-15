import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { formatCurrency } from '@angular/common';
import { AppComponent } from '../app.component'
import {NgForm} from '@angular/forms';
import { CreateDieSetComponent } from '../create-die-set/create-die-set.component';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  dieTypes: any = [
    '4',
    '6',
    '8',
    '10',
    '12',
    '20'
  ]

  constructor(public fb: FormBuilder) { }


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

  dieSetsForm = this.fb.group({
    name: ['']
  })

  selectDieSet() {
    alert(JSON.stringify(this.dieSetsForm.value))
  }
}

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

  dieTypes: any = [];
  selectedDieSet;
  selectedDieTypes: any = [];
  dieSets: any[] = [];
  dieSetSelect = false;

  constructor(public fb: FormBuilder) { }


  ngOnInit() {
    this.retrieveDieSets();
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    let rollValue = form.value.rollValue;
    let selectedDieType = form.value.dieType;
    console.log(this.selectedDieSet);
    let existing = localStorage.getItem(`${this.selectedDieSet}${selectedDieType}`);
    console.log(existing);
    let existingArray = existing ? existing.split(',') : [];
    console.log(existingArray);
    existingArray.push(rollValue);
    localStorage.setItem(`${this.selectedDieSet}${selectedDieType}`, existingArray.toString());
    form.reset();
  }

  /***DIE SET FUNCTIONS ***/
  
  retrieveDieSets() {
    let dieSetsArray = localStorage.getItem('dieSets').split(';');
    for (let i of dieSetsArray) {
      this.dieSets.push(JSON.parse(i));
    }
    console.log(typeof this.dieSets[0]);
  }

  dieSetsForm = this.fb.group({
    name: ['']
  })

  selectDieSet() {
    console.log(this.dieSetsForm.value)
    this.selectedDieSet=this.dieSetsForm.value['name'];
    for (let i of this.dieSets) {
      if (i['name'] == this.selectedDieSet) {
        this.selectedDieTypes = i['dieTypes'];
        this.dieTypes = i['dieTypes'];
        console.log(this.selectedDieTypes)
      }
    }
    this.dieSetSelect = true;
  }


}

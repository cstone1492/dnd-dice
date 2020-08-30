import { Component, OnInit, ViewChild } from '@angular/core';
import { stringify } from 'querystring';
import { formatCurrency } from '@angular/common';
//import { AppComponent } from '.../app.component';
import {NgForm, NgSelectOption, ɵNgSelectMultipleOption} from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-create-die-set',
  templateUrl: './create-die-set.component.html',
  styleUrls: ['./create-die-set.component.css']
})
export class CreateDieSetComponent implements OnInit {

  dieTypes: [
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
    let name = form.value.name;
    let description = form.value.description;
    console.log(form.value.dieType);
    //localStorage.setItem(selectedDieType, existingArray.toString());*/
    form.reset();
  }

}

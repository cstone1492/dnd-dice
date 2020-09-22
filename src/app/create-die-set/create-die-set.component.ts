import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { formatCurrency } from '@angular/common';
import { FormComponent } from '../form/form.component';
import {NgForm, FormArray, Validators} from '@angular/forms';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-create-die-set',
  templateUrl: './create-die-set.component.html',
  styleUrls: ['./create-die-set.component.css']
})
export class CreateDieSetComponent implements OnInit {
  
  dieSetForm: FormGroup;

  dieSetFormValid = true;
  
  constructor(private fb: FormBuilder) {
    this.dieSetForm = this.fb.group({
      dieTypesCheck: this.fb.array([]),
      name: new FormControl('', [
        Validators.required
      ])
    })
  }


  dieTypes: Array<any> = [
    { name: '4', value: '4'},
    { name: '6', value: '6'},
    { name: '8', value: '8'},
    { name: '10', value: '10'},
    { name: '12', value: '12'},
    { name: '20', value: '20'}
  ];

  onCheckboxChange(e) {
    const dieTypesCheck: FormArray = this.dieSetForm.get('dieTypesCheck') as FormArray;

    if (e.target.checked) {
      dieTypesCheck.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      dieTypesCheck.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          dieTypesCheck.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  

  submitForm() {
    if (!this.dieSetForm.value.dirty && this.dieSetForm.invalid) {
      console.log("name required");
      alert(
        `Name required!`
      )
      this.dieSetFormValid = false;
    } else {
    let selectedDieTypes = this.dieSetForm.value.dieTypesCheck;
    let dieSetName = this.dieSetForm.value.name;
    for (let item of selectedDieTypes) {
      let key = dieSetName + item;
      localStorage.setItem( key , "" );
    }

    //add to dieSets list
    let newDieSet = {
      name: dieSetName,
      dieTypes: selectedDieTypes
    }

    if (localStorage.getItem("dieSets") === null) {
      localStorage.setItem( "dieSets", JSON.stringify(newDieSet));
    } else {
      let dieSets = localStorage.getItem("dieSets") + `;` + JSON.stringify(newDieSet);
      localStorage.setItem( "dieSets", dieSets);
    }

    //reset Form 
    (this.dieSetForm.get('dieTypesCheck') as FormArray).clear();
    this.dieSetForm.reset();
  }
  }

  ngOnInit() {
  }

  get name() { return this.dieSetForm.get('name'); }
}

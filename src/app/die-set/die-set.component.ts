import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-die-set',
  templateUrl: './die-set.component.html',
  styleUrls: ['./die-set.component.css']
})
export class DieSetComponent implements OnInit {
  dieSets: any[] = []; 

  retrieveDieSets() {
    let dieSetsArray = localStorage.getItem('dieSets').split(';');
    for (let i of dieSetsArray) {
      this.dieSets.push(JSON.parse(i));
    }
    console.log(this.dieSets)
  }

  constructor() { }

  ngOnInit() {
    this.retrieveDieSets();
  }

}

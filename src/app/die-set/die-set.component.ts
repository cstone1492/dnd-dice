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

  deleteDieSet(index) {
    this.dieSets.splice(index, 1);
    let dieSetsJSON = "";
    for (let dieSet of this.dieSets) {
      if (this.dieSets.indexOf(dieSet) == 0) {
        dieSetsJSON = JSON.stringify(dieSet);
      } else {
        dieSetsJSON = dieSetsJSON + ";" + JSON.stringify(dieSet);
      }
    }
    localStorage.setItem( "dieSets", dieSetsJSON);
  }

  constructor() { }

  ngOnInit() {
    this.retrieveDieSets();
  }

}

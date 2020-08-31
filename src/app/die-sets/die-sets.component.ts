import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-die-sets',
  templateUrl: './die-sets.component.html',
  styleUrls: ['./die-sets.component.css']
})
export class DieSetsComponent implements OnInit {
  dieSets: object[] = [
    {name: "test set", dieTypes: ["4", "6", "8", "10", "12", "20"]}
  ];

  getDieSets() {
    return this.dieSets;
  }

  addDieSet(newDieSet) {
    this.dieSets.push(newDieSet);
  }

  constructor() { }

  ngOnInit() {
  }

}

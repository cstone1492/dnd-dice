import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chi-square-form',
  templateUrl: './chi-square-form.component.html',
  styleUrls: ['./chi-square-form.component.css']
})
export class ChiSquareFormComponent implements OnInit {
  dieTypes: any = [
    '4',
    '6',
    '8',
    '10',
    '12',
    '20'
  ]

  selectedDieType: string = '';

  testResults: string = '';

  displayResults: boolean = false;

  //create critical value table (only including degrees of freedom for dice, and probability of .95
  criticalValues = {
    3: 7.815,
    5: 11.070,
    7: 14.067,
    9: 16.919,
    19: 30.144
  }

  constructor() { }

  ngOnInit() {
  }

  dieTypeChangeHandler (event: any) {
    this.selectedDieType = event.target.value;
  }

  runChiSquare() {
    //declare variables
    
    let output: string;
    let dieRollsDifference = {};
    let possibleValues = [];
	  let dieRollsActual = {};
	  let chiSquarePossible: boolean = false;

    //set displayResults to true to show conditional HTML 
    
    this.displayResults = true;

    //retrieve key of relevant array of die rolls

    console.log(this.selectedDieType);
    var dieType = this.selectedDieType;
    var dieRolls = localStorage.getItem(dieType);
    var dieSides = Number(dieType);
    console.log(dieRolls);

    //turn die rolls into array of numbers

    var dieRollsArray = dieRolls.split(',').map(function(item) {
      return parseInt(item, 10);
    });
    console.log(`die rolls: ${dieRollsArray.length}; ${dieRollsArray}`);
    
    //check there are enough rolls
    
    let totalRolls = dieRollsArray.length
      //set dieRollsExpected as the expected number of rolls for each die side if the die was completely fair
    let dieRollsExpected = totalRolls / dieSides;
    console.log(`dieRollsExpected(${totalRolls}/${dieSides}): ${dieRollsExpected}`);
	  if (dieSides * 5 > dieRolls.length || dieRolls == null) {
		  console.log("not enough rolls of this die, collect more data!");
		  output = "not enough rolls of this die, collect more data!";
	  } else {
    
    //create an array of possible die values
      
    for(let i = 1; i <= dieSides; i ++){
        possibleValues.push(i);
        console.log(`possibleValues: ${possibleValues}`);
    }
    
    //create key for each possible value in dieRollsCounted, set to 0
    
    for(let item of possibleValues) {
        let newKey = item
        dieRollsActual[`${newKey}`] = 0;
      //count number of rolls of that value
      for(let i of dieRollsArray) {
        if(i == item) {
          dieRollsActual[newKey] = dieRollsActual[newKey] + 1;
        }
      }
      console.log(`total rolls of ${item} type: ${dieRollsActual[newKey]}`);
    }
   
    
    //create object of differences between actual and expected
      
    for(let item in dieRollsActual) {
        let newKey = item;
        let difference = (dieRollsActual[item] - dieRollsExpected)**2 / dieRollsExpected;
        dieRollsDifference[newKey] = difference;
        console.log(`dieRollsDifference for ${newKey}: ${dieRollsDifference[newKey]}`);
      }
    
    //calculate sum of difference
      
      let chi = 0;
      for (let item in dieRollsDifference) {
        chi = chi + dieRollsDifference[item];
      }
      console.log(`x**2 = ${chi}`);
      let degreesOfFreedom = dieSides - 1;
      console.log(`degreesOfFreedom: ${degreesOfFreedom}`)
    
      //check chi against critical value
    
      let criticalValue = this.criticalValues[degreesOfFreedom];
      console.log(criticalValue);
      let fair = true;
      if (chi > criticalValue) {
      fair = false
      }
      if (fair === false) {
      output = "Your die is so not fucking fair!";
      } else {
      output ="Your die is fair, blame something else!"
    }
}
  console.log(output);
  this.testResults = output;
	//return output;
	};
}


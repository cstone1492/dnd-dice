import { Component, OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { ChartOptions, ChartType, ChartDataSets, ChartHoverOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  dieTypes: string[] = [
    '4',
    '6',
    '8',
    '10',
    '12',
    '20'
  ]
  
  four: string = '';
  six: string = '';
  eight: string = '' ;
  ten: string = '';
  twelve: string = '';
  twenty: string = '';

  dieRollsArrayString: any [] = [
    `${this.four}`,
    `${this.six}`,
    `${this.eight}`,
    `${this.ten}`,
    `${this.twelve}`,
    `${this.twenty}`
  ]

  fourArray: number[];
  

  retrieveDieRolls(dieType: string) {
    let dieRollsString = localStorage.getItem(dieType);
    let dieRollsNumbers = dieRollsString.split(',').map(function(num) { return parseInt(num, 10); });
    return dieRollsNumbers;
  }

  dieRolls = {
    4: this.retrieveDieRolls("4"),
    6: this.retrieveDieRolls("6"),
    8: this.retrieveDieRolls("8"),
    10: this.retrieveDieRolls("10"),
    12: this.retrieveDieRolls("12"),
    20: this.retrieveDieRolls("20"),
  }

  //HISTOGRAM Options
  barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function(tooltipItem) {
          return `${tooltipItem.yLabel}`;
        }
      }
    }
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];


  barChartData: ChartDataSets[];



  selectedDie = [];

  //DISTRIBUTION FUNCTION 
  displayHistogram: boolean = false;

  createStackedHistogram (dieType) {
    this.createHistogram(dieType)
  }

  createHistogram (dieType) {
    this.displayHistogram = true;
    //create barChartLabels
    let dieValue = Number(dieType);
    let dieSides = [];
    for (let i = 1; i <= dieValue; i++) {
      dieSides.push(i);
    };
    this.barChartLabels = dieSides;

    //create data
    var dieRolls = this.retrieveDieRolls(dieType);
    /*var dieRollsArray = dieRolls.split(',').map(function(item) {
      return parseInt(item, 10);
    });*/

    //count die Rolls
    let dieRollsCounted = {};
    let dieRollsData = []
      //create key for each possible value in dieRollsCounted, set to 0
      for(let item of dieSides) {
        let newKey = item
        dieRollsCounted[`${newKey}`] = 0;
        //count number of rolls of that value
        for(let i of dieRolls) {
          if(i == item) {
            dieRollsCounted[newKey] = dieRollsCounted[newKey] + 1;
        }
      }
      console.log(`total rolls of ${item} side: ${dieRollsCounted[newKey]}`);
      //push into Dataarray
      dieRollsData.push(Number(`${dieRollsCounted[newKey]}`));
      console.log(dieRollsData);
    }

    //create data for bar chart NEED TO MODIFY
    this.barChartData = [
      {
        data: dieRollsData,
        label: 'Histogram of ' + dieType +'-sided die'
      }
    ];

  }


  dieRollAverage(dieRolls) {
    //sum die Rolls
    let sum: number = 0;
    for (let i of dieRolls) {
      sum += i;
    }
    let average: number = sum / dieRolls.length;
    return average;
  }

  
  testResults: string = '';
  displayResults: boolean = false;

  constructor() { }

  ngOnInit() {
  
  }

  

  runChiSquare(selectedDieType) {
    //declare variables
    let output;
    let dieRollsDifference = [];
    let possibleValues = [];
	  let dieRollsActual = {};
	  let chiSquarePossible = false;

    //set displayResults to true to show conditional HTML 
    this.displayResults = true;

    //create critical value table (only including degrees of freedom for dice, and probability of .95

    let criticalValues = {
	    3: 7.815,
	    5: 11.070,
	    7: 14.067,
	    9: 16.919,
	    19: 30.144
    }

    

      //retrieve key of relevant array of die rolls

      var dieType = selectedDieType;
      var dieRolls = localStorage.getItem(dieType);
      var dieSides = Number(dieType);
      console.log(`dieType: ${selectedDieType} dieRolls: ${dieRolls}`);

      //turn die rolls into array of numbers

      var dieRollsArray = dieRolls.split(',').map(function(item) {
        return parseInt(item, 10);
      });
      console.log(`die rolls: ${dieRollsArray.length}; ${dieRollsArray}`);
    
    //check there are enough rolls
    
    let totalRolls = dieRolls.length
	  let dieRollsExpected = totalRolls / dieSides;
	  if (dieSides * 5 > dieRolls.length || dieRolls == null) {
		  console.log("not enough rolls of this die, collect more data!");
		  output = "not enough rolls of this die, collect more data!";
	  } else {
      //create an array of possible die values
      
      for(let i = 1; i <= dieSides; i ++){
        possibleValues.push(i);
      }
    
      //create key for each possible value in dieRollsCounted, set to 0
      for(let item of possibleValues) {
        let newKey = item
        dieRollsActual[`${newKey}`] = 0;
      
      //count number of rolls of that value
      for(let i of dieRollsArray) {
        if(i === item) {
          dieRollsActual[newKey] = dieRollsActual[newKey] + 1;
        }
      }
      }
    
    
      //create object of differences between actual and expected
      
      for(let item in dieRollsActual) {
        let newKey = item;
        let difference = (dieRollsActual[item] - dieRollsExpected)**2 / dieRollsExpected;
        dieRollsDifference[newKey] = difference;
      }
      console.log(`dieRollDifference: ${dieRollsDifference}`);
    
      //calculate sum of difference
      
      let chi = 0;
      for (let item in dieRollsDifference) {
        console.log(item);
        chi = chi + dieRollsDifference[item];
      }
      console.log(`x**2 = ${chi}`);
      let degreesOfFreedom = dieSides - 1;
      console.log(`degrees of freed: ${degreesOfFreedom}`)
    
      //check chi against critical value
    
      let criticalValue = criticalValues[degreesOfFreedom];
      console.log(`criticalValue: ${criticalValue} chi: ${chi}`);
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
	return output;
	};
}


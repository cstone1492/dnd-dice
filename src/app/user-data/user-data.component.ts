import { Component, OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { ChartOptions, ChartType, ChartDataSets, ChartHoverOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { isNull, isNullOrUndefined } from 'util';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  dieTypes: string[] = [];
  selectedDieSet;
  selectedDieTypes: any = [];
  dieSets: any[] = [];
  dieSetSelect = false;
  
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
  
  retrieveDieSets() {
    let dieSetsArray = localStorage.getItem('dieSets').split(';');
    for (let i of dieSetsArray) {
      this.dieSets.push(JSON.parse(i));
    }
    console.log(this.dieSets)
  }

  retrieveDieRolls(dieType: string) {
    let dieRollsString = localStorage.getItem(`${this.selectedDieSet['name']}${dieType}`);
    console.log(dieRollsString);
    if (isNullOrUndefined(dieRollsString)) {
      return "No rolls stored";
    } else {
      let dieRollsNumbers = dieRollsString.split(',').map(function(num) { return parseInt(num, 10); });
      return dieRollsNumbers;
    }
  }

  dieRolls = {};

  createDieRollsObject() {
    for (let i of this.selectedDieTypes){
      this.dieRolls[`${i}`] = this.retrieveDieRolls(`${i}`)
    }
    console.log(this.dieRolls);
  }

  //HISTOGRAM Options
  barChartOptions: ChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
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

  /*******DISTRIBUTION FUNCTION********/
  /************************************/
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

    //count die Rolls
    let dieRollsCounted = {};
    let dieRollsData = []
      //create key for each possible value in dieRollsCounted, set to 0
      for(let item of dieSides) {
        let newKey = item;
        console.log(`counting sides for side ${item}`);
        dieRollsCounted[`${newKey}`] = 0;
        //count number of rolls of that value
        for(let i of this.dieRolls[`${dieType}`]) {
          console.log(item);
          if(i == item) {
            dieRollsCounted[newKey] = dieRollsCounted[newKey] + 1;
        }
      }
      console.log(`total rolls of ${item} side: ${dieRollsCounted[newKey]}`);
      //push into Dataarray
      dieRollsData.push(Number(`${dieRollsCounted[newKey]}`));
      console.log(`dieRollsData: ${dieRollsData}`);
    }

    //create data for bar chart 
    this.barChartData = [
      {
        data: dieRollsData,
        label: 'Histogram of ' + dieType +'-sided die'
      }
    ];

  }


  /*STATISTICS FUNCTIONS*/
  /**********************/
  
  numberOfRolls(die) {
    if (this.dieRollAverage(die) == "no die rolls stored") {
      return "0";
    } else {
      return die.length;
    }
  }

  dieRollAverage(dieRolls) {
    //sum die Rolls
      let sum: number = 0;
      for (let i of dieRolls) {
        sum += i;
      }
      let average: number = sum / dieRolls.length;
      average = Math.round(average);
      if (isNaN(average)) {
        return "no die rolls stored";
      } else {
        return average;
      }
    
  }

  clearDieRolls(key) {
    localStorage.setItem(key, '');
    console.log(localStorage.getItem(key))
  }
  
  testResults: string = '';
  displayResults: boolean = false;

  constructor(public fb: FormBuilder) {
    
   }

  ngOnInit() {
    this.retrieveDieSets();
  }

  /*Die Set Selection*/
  /*******************/

  dieSetsForm = this.fb.group({
    name: ['']
  })

  selectDieSet() {
    this.selectedDieSet = this.dieSetsForm.value;
    console.log(this.selectedDieSet);
    for (let i of this.dieSets) {
      console.log(i);
      if (i['name'] == this.selectedDieSet['name']) {
        this.selectedDieTypes = i['dieTypes'];
        this.dieTypes = i['dieTypes'];
        console.log(this.selectedDieTypes)
      }
    }
    this.dieSetSelect = true;
    this.createDieRollsObject();
    console.log(this.dieRolls);
  }

  /****CHI SQUARE *****/
  /********************/
  
  runChiSquare(selectedDieType) {
    console.log('calculating Chi Square');
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
      var dieRolls = localStorage.getItem(`${this.selectedDieSet['name']}${dieType}`);
      var dieSides = Number(dieType);

    //turn die rolls into array of numbers
      var dieRollsArray = dieRolls.split(',').map(function(item) {
        return parseInt(item, 10);
      });
      console.log(`die rolls for D${selectedDieType}: ${dieRollsArray.length}; ${dieRollsArray}`);
    
    //check there are enough rolls
    let totalRolls = dieRollsArray.length
    let dieRollsExpected = totalRolls / dieSides;
    console.log(`Die Rolls Expected(${totalRolls}/${dieSides}): ${dieRollsExpected}`);
	  if (dieSides * 5 > dieRolls.length || dieRolls == null) {
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
      console.log(`${item} total: ${dieRollsActual[newKey]}`);
    }
    
    //create object of differences between actual and expected
    for(let item in dieRollsActual) {
      let newKey = item;
      console.log(newKey);
      console.log(`difference for ${item}: ${dieRollsActual[item]}`);
      console.log(dieRollsExpected);
      let difference = (dieRollsActual[item] - dieRollsExpected)**2 / dieRollsExpected;
      console.log(difference);
      dieRollsDifference[newKey] = difference;
    }
    console.log(`die roll differences: ${dieRollsDifference}`);
    
    //calculate sum of difference
    let chi = 0;
    for (let item in dieRollsDifference) {
        console.log(item);
        chi = chi + dieRollsDifference[item];
    }
    console.log(`x**2 = ${chi}`);
    let degreesOfFreedom = dieSides - 1;
    console.log(`degrees of freedom: ${degreesOfFreedom}`)
    
    //check chi against critical value
    let criticalValue = criticalValues[degreesOfFreedom];
    console.log(`criticalValue: ${criticalValue} x**2: ${chi}`);
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


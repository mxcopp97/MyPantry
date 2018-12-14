import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  inputText : string = '';
  calorieInfo;
  weight;
  healthLabels : string [];
  dietLabels : string [];

  constructor() { }

  ngOnInit() {
  }

  //on new input, do an api call
  onNewInput(){
    console.log("NEW INPUT");
    console.log(this.inputText);

    this.doApiCall(this.inputText, this);
  }

  //do the api call, searching nutrition info for the input text
  doApiCall(text:string, tsFile){

    text = text.trim();
    while(text.includes(" ")){
      text = text.replace(" ", "%20");
    }

    var qResponse;

    let recipeQuery = "https://api.edamam.com/api/nutrition-data?app_id=ea456f24&app_key=10731179da919a476d7c74b7ab6a9534&ingr=" + text,
            xhr = new XMLHttpRequest;
    
    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            qResponse = JSON.parse(xhr.responseText);
            console.log(qResponse);
            tsFile.displayInfo(qResponse);
        }
        else{
          qResponse = "ERROR";
        }
      };
    xhr.open("GET", recipeQuery, true );
    xhr.send();
  }


  //link the info from the json back into the data structures in this file
  public displayInfo(json) {
      this.calorieInfo = json.calories;
      this.dietLabels = json.dietLabels;
      this.healthLabels = json.healthLabels;
      this.weight = json.totalWeight;

      /*
      this.dietLabels.forEach(element => {
        element = element.replace("_", " ")
      });
     this.healthLabels.forEach(element => {
        element = element.replace("_", " ")
      });
      */

  }

}

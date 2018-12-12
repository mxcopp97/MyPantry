import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes : string[] = ['link1', 'link2', 'link3'];

  constructor(private http: HttpClient) {
   }
  
  public getItems(){
    return this.recipes;
  }

  public searchRecipes(items){

    if(items.length > 0){
     let recipeUrl = "https://api.edamam.com/search?q=" + items[0] + "&app_id=${30092510}&app_key=${90d5cb195c19bfcfc69e651a692814de}";
     console.log(this.http.get(recipeUrl));
    }

    let foodUrl = "https://api.weatherbit.io/v2.0/current?key=52120737603741019f32e2d5751a5d24&lat=5&lon=5";
    console.log(this.http.get(foodUrl));

    let weatherUrl = "https://api.weatherbit.io/v2.0/current?key=52120737603741019f32e2d5751a5d24&lat=50&lon=50",
            xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            var weatherTest = xhr.responseText;
            console.log(weatherTest)
        }
    };
    xhr.open( "GET", weatherUrl, true );
    xhr.send();

  }

}

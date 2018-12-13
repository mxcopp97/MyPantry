import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private responseData;
  private recipeData : Object[] = [
    {
      name: 'Refresh to find recipes based on your food inventory',
      link: ""
    }
  ];

  private recipes : string[] = ['Update to show recipes based on your ingredients'];

  constructor(private http: HttpClient) {
   }

  public getRecipeData(){
    return this.recipeData;
  }

  public getRecipeList(){
    return this.recipes;
  }

  public searchTopRecipes(items, tsFile){
    if(items.length == 0){
      console.log("No ingredients to search recipes for!")
      return;
    }

    let recipeQuery = "https://www.food2fork.com/api/search?key=e0f06d9e917c4b44d205a4fca1cbef99&q=",
            xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            var qResponse = JSON.parse(xhr.responseText);
            console.log(qResponse);
            tsFile.uncodeJsonToRecipes(qResponse);
        }
    };
    recipeQuery += items[0][0];
    let i = 1;
    while(i < 3){
      if(items.length - 1 < i){
        break;
      }
      else{
        recipeQuery += ',' + items[i][0];
      }
      i++;
    }
    xhr.open( "GET", recipeQuery, true );
    xhr.send();
  }

/*
  public uncodeJsonToRecipes(json){
    this.recipeData = [];
    this.recipes = [];

    let i = 0
    while(i < 10 && json.recipes.length > i){
        this.recipeData.push(
          {
            name: json.recipes[i].title,
            link: json.recipes[i].source_url
          }
        );
      this.recipes.push(json.recipes[i].title);
      i++;
    }
    console.log(this.getRecipeData());
    console.log(this.recipes);
  }
  */
}

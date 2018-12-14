import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, ItemSliding, List } from '@ionic/angular';
import { ItemListService } from '../item-list.service';
import { RecipeService } from "../recipe.service";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //individual lists for data use
  ingredientList : string[][] = [];

  //itemList for display
  itemList : Object[];
  recipeList : string[];

  constructor( public alertController: AlertController, private _ngZone: NgZone, private listService : ItemListService,
                  private recipeService : RecipeService){};

  //initialize variables
  ngOnInit(): void {
    this.ingredientList = this.listService.getItems();
    this.itemList = this.recipeService.getRecipeData();
    this.recipeList = this.recipeService.getRecipeList();

    this.searchRecipesFor();

  }

  //use the search function in the recipe service to get recipes based on inventory
  async searchRecipesFor(){
    this.recipeService.searchTopRecipes(this.ingredientList, this);
    console.log(this.recipeList);
  }

  //given the response json from the API, fill in recipes in the recipe list
  public uncodeJsonToRecipes(json){
    this.itemList = [];
    this.recipeList = [];

    let i = 0
    while(i < 10 && json.recipes.length > i){
        this.itemList.push(
          {
            name: json.recipes[i].title,
            link: json.recipes[i].source_url
          }
        );
      this.recipeList.push(json.recipes[i].title);
      i++;
    }
  }

}

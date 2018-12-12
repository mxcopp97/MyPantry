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

  itemList : string[] = [];

  ngOnInit(): void {
    this.itemList = this.recipeService.getItems();
  }

  constructor( public alertController: AlertController, private _ngZone: NgZone, private listService : ItemListService,
                  private recipeService : RecipeService){};

  async searchRecipesFor(){
    this.recipeService.searchRecipes(this.listService.getItems());
  }



}

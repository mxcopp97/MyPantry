import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  private items = ['milk', 'yogurt', 'bread'];

  constructor() { }

  public getItems(){
    return this.items;
  }
  public addItem(item){
    this.items.push(item);
  }

  public remove(itemIndex, itemSlidingList){
    this.items.splice(itemIndex, 1);
    console.log(this.getItems());
  }

}

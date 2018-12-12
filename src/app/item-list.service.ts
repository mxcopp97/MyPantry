import { Injectable } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  private items : string[][] = [['bread','7'], ['milk', '3']];

  constructor() { }

  public getItems(){
    return this.items;
  }
  public addItem(item, date){
    let count = this.getCountdown(date);
    let newEntry : string[] = [item, count];
    this.items.push(newEntry);
    this.items.sort(this.compareCountdown);
  }

  public remove(itemIndex, itemSlidingList){
    this.items.splice(itemIndex, 1);
  }

  //Needs work
  //return how many days a current food item has left
  public getCountdown(food : string){
    let currentDate = new Date(), dayInMs=1000*60*60*24;
    let foodDate = new Date();

    foodDate.setMonth(parseInt(food.substr(0,2)) - 1);
    foodDate.setDate(parseInt(food.substr(3,2)));
    foodDate.setFullYear(2000 + parseInt(food.substr(6,2)));

    console.log(foodDate);

    let currentMs = currentDate.getTime(),
      foodMs = foodDate.getTime();
    
    let diff = Math.floor((foodMs - currentMs)/dayInMs);

    return diff;
    
  }

  private compareCountdown(a, b){
    if (a[1] === b[1]) return 0;
    else return (a[1] < b[1]) ? -1 : 1;

  }
    
}

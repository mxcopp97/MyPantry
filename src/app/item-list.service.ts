import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  private items : string[][] = [['broccoli','7'], ['cheese', '3']];

  constructor() {
      this.items.sort(this.compareCountdown);
   }
  
  //return the item structure
  public getItems(){
    return this.items;
  }
  //add an item to the data structure
  public addItem(item, date){
    let count = this.getCountdown(date);
    let newEntry : string[] = [item, count];
    this.items.push(newEntry);
    this.items.sort(this.compareCountdown);
  }

  //remove an item from the data structure
  public remove(itemIndex, itemSlidingList){
    this.items.splice(itemIndex, 1);
  }

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

  //helper compare function for the countdown dates
  private compareCountdown(a, b){
    if (a[1] === b[1]) return 0;
    else return (a[1] < b[1]) ? -1 : 1;

  }

  /*
  private writeToFile(){
    this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
      console.log("Directory doesn't exist"));
  }
  */
    
}

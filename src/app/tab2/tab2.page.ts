import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, ItemSliding, List } from '@ionic/angular';
import { ItemListService } from '../item-list.service';
import { RecipeService } from "../recipe.service";
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  itemList : string[][] = [];

  //Run once on init
  ngOnInit(): void {
    this.itemList = this.listService.getItems();
    this.writeToFile();
  }

  constructor( public alertController: AlertController, private _ngZone: NgZone, private listService : ItemListService,
                  private recipeService : RecipeService, private file: File){};

  //Remove an item with itemSliding, given the index and sliding item list
  async removeItem(itemIndex, itemSlidingList :ItemSliding) {
    itemSlidingList.close();
    await this.listService.remove(itemIndex, itemSlidingList)
  }

  private writeToFile(){
    //this.file.createFile(this.file.documentsDirectory, "newFile.txt", false);
    //this.file.createDir(this.file.dataDirectory, "storageFiles", true);
  }
  

  //create a new add prompt for the user to enter a food and date
  async newAddPrompt(){
    const addTodoAlert = await this.alertController.create(
        {
            header: 'Add an ingredient',
            message: 'Remember to include expiration date',
            inputs: [
            {
                type: 'text',
                name: 'newInput',
                placeholder: 'New Item'
            },
            {
                type: 'text',
                name: 'newDate',
                placeholder: 'mm-dd-yy'
            }
            ],
            buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'OK',
                handler: (inputData) => {
                    let newItem, newItemDate;
                    if (inputData.newInput && inputData.newDate) {
                        newItem = inputData.newInput.trim(),
                        newItemDate = inputData.newDate.trim();
                        if (newItem !== '' && newItemDate[2]=='-' && newItemDate[5]=='-') {
                          this._ngZone.run(() => {
                            this.listService.addItem(newItem, newItemDate);
                          });
                        } else {
                            console.log('The input string is empty.');
                        }
                    } else {
                        console.log('The input string is not set.');
                    }
                    return newItem;
                }
            }
            ]
        });
        await addTodoAlert.present();
        
    }
}

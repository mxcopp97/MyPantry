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

  ngOnInit(): void {
    this.itemList = this.listService.getItems();
    this.writeToFile();
  }

  constructor( public alertController: AlertController, private _ngZone: NgZone, private listService : ItemListService,
                  private recipeService : RecipeService, private file: File){};

  async removeItem(itemIndex, itemSlidingList :ItemSliding) {
    itemSlidingList.close();
    await this.listService.remove(itemIndex, itemSlidingList)
  }

  private writeToFile(){
    this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory 1 exists')).catch(err => console.log('Directory path 1 doesn\'t exist'));
    //this.file.createDir(this.file.dataDirectory, "storageFiles", true);
    //this.file.createFile(this.file.cacheDirectory, "newFile", true );
  }
  

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

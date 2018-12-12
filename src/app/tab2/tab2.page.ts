import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, ItemSliding, List } from '@ionic/angular';
import { ItemListService } from '../item-list.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  itemList : string[] = [];

  ngOnInit(): void {
    this.itemList = this.listService.getItems();
  }

  constructor( public alertController: AlertController, private _ngZone: NgZone, private listService : ItemListService){};

  async removeItem(itemIndex, itemSlidingList :ItemSliding) {
    itemSlidingList.close();
    await this.listService.remove(itemIndex, itemSlidingList)
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
                    let newItem;
                    if (inputData.newInput) {
                        newItem = inputData.newInput.trim();
                        if (newItem !== '') {
                          this._ngZone.run(() => {
                            this.listService.addItem(newItem);
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

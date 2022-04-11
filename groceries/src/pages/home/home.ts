import { Component } from '@angular/core';
//import { P } from '@angular/core/src/render3';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  title = "Grocery List!";

  items = [
    {
      name: "Bread",
      qty: 2
    }, 
    {
      name: "Milk",
      qty: 1
    }, 
    {
      name: "Trash Bags",
      qty: 32
    }, 
    {
      name: "Cheese",
      qty: 3
    }, 
  ]

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, private socialSharing: SocialSharing) {

  }
  editItem(item, index) {
    console.log("Edit item... ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item... '+ index + "....",
      duration: 3000
    });
    toast.present();
    this.showEditItemPrompt(item, index);
  }

  shareItem(item, index) {
    console.log("Share item... ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item... '+ index + "....",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item: Name -" + item.name +"; Quantity - " + item.qty;
    let subject = "Grocery Item from App";
    this.socialSharing.shareViaEmail(message, subject, ['example@gmail.com']).then(() => {
      console.log("Shared Successfully!")
      // Sharing via email is possible
    }).catch(() => {
      
      // Sharing via email is not possible
    });
  }

  removeItem(item, index) {
    console.log("Removing item... ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item... '+ index + "....",
      duration: 3000
    });
    toast.present();

    this.items.splice(index,1);
  }

  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Please enter item....",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name:"qty",
          placeholder: "Quantity"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Save Clicked', item);
            this.items.push(item);
          }
        }
      ]
    });
    prompt.present();
  }

  showEditItemPrompt(item, index) {
    const prompt = this.alertCtrl.create({
      title: 'Edit Item',
      message: "Please edit item....",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item.name
        },
        {
          name:"qty",
          placeholder: "Quantity",
          value: item.qty
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Save Clicked', item);
            this.items[index] = item;
          }
        }
      ]
    });
    prompt.present();
  }

}

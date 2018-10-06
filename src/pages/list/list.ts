import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  list2 : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.list2 = {
	items: [ 
		{ name: 'Bob', image: 'assets/img/wallet/bitcoin.png', description: 'Awesome guy'  },
		{ name: 'Rob', image: 'assets/img/wallet/bitcoin.png', description: 'Cool guy'  }
            ]
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}

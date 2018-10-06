import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Bitcoin } from '../../providers/bitcoin';


/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-couponview',
  templateUrl: 'couponview.html',
})
export class CouponviewPage {

  coupon: any;
  balance: any;
  loading: any;
  amount: any;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public bitcoinService: Bitcoin,
              public navParams: NavParams) {

       this.coupon = null;
       this.balance = '';
       if(typeof this.navParams.data.coupon == "undefined")
       {
	  this.navCtrl.push('CouponsPage');
       }
       this.coupon = this.navParams.data.coupon;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractIssuePage');
  }

  getBalance() {
    this.bitcoinService
      .getBalances(this.coupon.couponaddress).then(posts  => {
      this.balance = posts;
    }, error => {
        console.log(error);
    });
  }


  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }
  

  
}

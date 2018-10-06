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
  selector: 'page-planview',
  templateUrl: 'planview.html',
})
export class PlanviewPage {

  plan: any;
  balance: any;
  loading: any;
  amount: any;
  parsedvendor : any;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public bitcoinService: Bitcoin,
              public navParams: NavParams) {

       this.plan = null;
       this.balance = '';
       if(typeof this.navParams.data.plan == "undefined")
       {
	  this.navCtrl.push('PlansPage');
       }
       this.plan = JSON.parse(this.navParams.data.plan.serverdata);
       //this.parsedvebd = this.navParams.data.plan;
       this.plan.vendoraddress = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractIssuePage');
  }

  getBalance() {
    this.bitcoinService
      .getBalances(this.plan.vendoraddress).then(posts  => {
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

import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Planmanager } from '../../providers/planmanager';
import { Coupon } from '../../providers/coupon';
import { Bitcoin } from '../../providers/bitcoin';
import { Clipboard } from '@ionic-native/clipboard';

import { ServerlessWallet } from '../../providers/serverlesswallet';

/**
 * Generated class for the BalancesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recoverwallet',
  templateUrl: 'recoverwallet.html',
})
export class RecoverWalletPage {

  loading: any;
  plan: any;
  plans: any;
  feesdata: any;
  walletbalance: any;
  recoverydata: any;
  externalwallet: any;
  wallet: any;

  relationship = 'bitcoin';

  chargingdata: any;
  chargingamount : any;
  feesamount : any;
  serverless: any;
  feeslevel: any;
  availablePlans : any;
 
  plandata : any;

  constructor(public navCtrl: NavController, 
              public planService: Planmanager,
              public couponService: Coupon,
              private clipboard: Clipboard,
              public bitcoinService: Bitcoin,
              public serverlessWallet: ServerlessWallet,
              public loadingCtrl: LoadingController,
	      public navParams: NavParams) {

       this.serverless = {
	contractid: 'CONT1',
	balance: '',
	walletaddress: '',
	fees: '',

       };

       this.recoverydata = '';
       this.feeslevel = [
	 {levelname: "low", levelfees: 20},
	 {levelname: "medium", levelfees: 30},
	 {levelname: "high", levelfees: 50},

       ];
       this.wallet = this.serverlessWallet.getBitcoinWallet();

       this.plandata = {
	  vendoraddress: '',
          balance: {}

       };
       this.externalwallet = {
         sendaddress: '',
         sendamount: ''
       };

       this.feesdata = {
	  address: '',
          balance: ''
       };

       this.chargingdata = {
	  address: '',
          balance: ''
       };
       this.walletbalance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };


       this.feesamount = "0";
       this.getWalletBalance();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  copyaddr() {
   this.clipboard.copy(this.walletbalance.address);
  }

  saveexternaladdress() {
       if(this.externalwallet.sendaddress == '')
       {
	 alert('Enter external address');
         return;
       }
       this.serverlessWallet.setExternalBitcoinWallet(this.externalwallet);
  }

  recoverWallet() {

	alert(this.recoverydata);

  }

  sendexternalamount() {
       var ext = this.serverlessWallet.getExternalBitcoinWallet();
       if(ext.sendaddress == '')
       {
	 alert('External address not set');
         return;
       }
       if(this.externalwallet.sendamount > this.walletbalance.balance)
       {
	 alert('No balance to send ');
         return;
       }
  
	 alert('Will be implemented shorty');
       // transfer code to be added here 
  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }
   getWalletBalance(){

    this.showLoader();

    this.bitcoinService.getBalances(this.wallet.walletkeyaddress).then((result) => {

      this.loading.dismiss();
      this.walletbalance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }


   getAvailablePlans() {

   var vendorid = 10;

   this.planService.getAvailablePlans(vendorid).then((result: Array<any>) => {
                this.availablePlans = result.map(function(x) {

                       var p = JSON.parse(x.serverdata);
                       return p; //{planname: p.planname, plainid: p.planid}
                       } );

                console.log("got plans");
                       }, (err) => {
                console.log("getting plans failed "+ err);
                });
  }


  planCreate() {
    this.showLoader();

   this.planService.createPlan(this.plandata).then((result) => {
                this.loading.dismiss();
                this.plan = result;
                                        console.log("plan created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                                });
  }

  getPlan() {
    this.showLoader();

   var plandata = {
        name: 'test'
   };

   var whichside = 1;

   this.planService.getPlan(plandata, whichside).then((result) => {
                this.loading.dismiss();
                this.plan = result;
                                        console.log("plan created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                               });
  }

  getChargingBalance() {

   this.couponService.getChargingBalance().then((result) => {
                this.chargingdata = result;
                                        console.log("plan created");
                                }, (err) => {
                                        console.log("not allowed"+ err);
               });

  }
  
  getIncomeBalance() {

   this.bitcoinService.getBalances(this.plandata.vendoraddress).then((result) => {
                this.plandata.balance = result;
                                        console.log("plan created");
                                }, (err) => {
                                        console.log("not allowed"+ err);
               });

  }
  getFeesBalance() {

   this.couponService.getFeesBalance().then((result) => {
                this.feesdata = result;
                                        console.log("plan created");
                                }, (err) => {
                                        console.log("not allowed"+ err);
               });

  }

 activatePlan(plan){

    this.showLoader();

    var pauseactivate = {
        activate : true,
        pause: false,
        planid : 1
    };

    this.planService.pauseActivatePlan(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.plans.indexOf(plan);

                if(index > -1){
                        this.plans.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

 pausePlan(plan){

    this.showLoader();

    var pauseactivate = {
        activate : false,
        pause: true,
        planid : 1
    };

    this.planService.pauseActivatePlan(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.plans.indexOf(plan);

                if(index > -1){
                        this.plans.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Payment } from '../../providers/payment';
import { Bitcoin } from '../../providers/bitcoin';
import { Popservice } from '../../providers/popservice';

import { Planmanager } from '../../providers/planmanager';

/**
 * Generated class for the PaymentIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-issue',
  templateUrl: 'payment-issue.html',
})
export class PaymentIssuePage {


  payments: any;
  payment: any;
  balance: any;
  loading: any;
  paymentdata: any;
  availablePlans: any;
  payees: any;
  payee: any;
  availableSchemes: any;

  constructor(public navCtrl: NavController, public paymentService: Payment, 
              public managerService: Planmanager,
              public bitcoinService: Bitcoin,
              public loadingCtrl: LoadingController,
              public alertCtrl: Popservice,
              public navParams: NavParams) {

    this.paymentdata = {
            paymentid: '',
            paymentkey: '',
            vendorid: '',
            paymentplan: '',
            payeename: '',
            paymentaccesskey: '',
	    paymentvalue: '',
            paymentpin: ''
    };
    this.availablePlans = '';
    this.availableSchemes = '';
    this.balance = '';
    this.getAvailablePlans();
    this.getAvailableSchemes();
    this.payees = [
	{name: 'Ramu', phone: '4567878990'},
	{name: 'Raju', phone: '9897878990'}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentIssuePage');
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }

  checkFunds() {
    var fundaddress = '2N5ZyMz5xmt47znM9CCKnrLbXmymGLknus9';
    this.bitcoinService
      .getBalances(fundaddress).then(posts  => {
      this.balance = posts;
    }, error => {
        console.log(error);
    });
  }
 
  createPIN()
  {
    var length = 5;
    this.paymentdata.paymentpin  = Math.random().toString().substr(2, length);
  }
  createAccesskey()
  {
    var length = 10;
    this.paymentdata.paymentaccesskey  = "AXS"+Math.random().toString(36).substr(2, length).toUpperCase();
  }
  
  
  createPaymentId()
  {
    this.paymentdata.paymentkey = this.bitcoinService.getRandomPubkey();
    this.paymentdata.paymentid = "AX_"+this.paymentdata.paymentkey.substr(0, 9).toUpperCase();
  }
  
  getplandata (planid)
  {
    for(var i=0; i< this.availablePlans.length; i++)
    {
	if(this.availablePlans[i].planid == planid)
        {
	 return this.availablePlans[i];
        }
    }
  }

  createPayment() {
    this.showLoader();

//   var p1 = this.getplandata(this.paymentdata.paymentplanid);
   this.paymentdata.paymentplan = "JSON.stringify(p1)";
   this.paymentdata.vendorid = "p1.vendorid";

   this.paymentService.createPayment(this.paymentdata).then((result) => {
                this.loading.dismiss();
                this.payment = result;
                                        console.log("payment created");
                                }, (err) => {
                this.loading.dismiss();
 		//this.alertCtrl.presentAlert(JSON.parse(err._body).error);
                                        console.log("not allowed"+ err);
                                });
  }

  getPayment() {
    this.showLoader();

   var paymentdata = {
        name: 'test'
   };
   this.paymentService.getPaymentMade(paymentdata).then((result) => {
                this.loading.dismiss();
                this.payment = result;
                                        console.log("payment created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                                });
  }

  getAvailableSchemes() {

   var vendorid = 10;

   this.managerService.getAvailableSchemes(vendorid).then((result) => {
                this.availableSchemes = result;
                console.log("got plans");
                       }, (err) => {
                console.log("getting plans failed "+ err);
                });
  }
  
  

  getAvailablePlans() {

   var vendorid = 10;

   this.managerService.getAvailablePlans(vendorid).then((result: Array<any>) => {
                this.availablePlans = result.map(function(x) {

                       var p = JSON.parse(x.serverdata);
                       return p; //{planname: p.planname, plainid: p.planid}
                       } );

                console.log("got plans");
                       }, (err) => {
                console.log("getting plans failed "+ err);
                });
  }
  
  activatePayment(payment){

    this.showLoader();

    var pauseactivate = {
	activate : true,
	pause: false,
        paymentid : 1
    };

    this.paymentService.pauseActivatePayment(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.payments.indexOf(payment);

                if(index > -1){
                        this.payments.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  pausePayment(payment){

    this.showLoader();

    var pauseactivate = {
	activate : false,
	pause: true,
        paymentid : 1
    };

    this.paymentService.pauseActivatePayment(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.payments.indexOf(payment);

                if(index > -1){
                        this.payments.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
  
  getPaymentBalance(payment){

    this.showLoader();

    var paymentdata = {
        activate : false,
        pause: true,
        paymentid : 1
    };

    this.paymentService.getPaymentBalance(paymentdata).then((result) => {

      this.loading.dismiss();
      this.balance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }



  
}

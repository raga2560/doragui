import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Coupon } from '../../providers/coupon';
import { Bitcoin } from '../../providers/bitcoin';
import { Popservice } from '../../providers/popservice';

import { Planmanager } from '../../providers/planmanager';

/**
 * Generated class for the CouponIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon-issue',
  templateUrl: 'coupon-issue.html',
})
export class CouponIssuePage {


  coupons: any;
  coupon: any;
  balance: any;
  loading: any;
  coupondata: any;
  availablePlans: any;
  availableSchemes: any;

  constructor(public navCtrl: NavController, public couponService: Coupon, 
              public managerService: Planmanager,
              public bitcoinService: Bitcoin,
              public loadingCtrl: LoadingController,
              public alertCtrl: Popservice,
              public navParams: NavParams) {

    this.coupondata = {
            couponid: '',
            couponkey: '',
            vendorid: '',
            couponname: '',
            couponbrand: '',
            couponplan: '',
            couponplanid: '',
            couponscheme: '',
	    couponvalue: '',
            couponpin: ''
    };
    this.availablePlans = '';
    this.availableSchemes = '';
    this.balance = '';
    this.getAvailablePlans();
    this.getAvailableSchemes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponIssuePage');
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }

  checkFunds() {
    var fundaddress = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9';
    this.bitcoinService
      .getBalances(fundaddress).subscribe(posts  => {
      this.balance = posts;
    }, error => {
        console.log(error);
    });
  }
 
  createPIN()
  {
    var length = 5;
    this.coupondata.couponpin  = Math.random().toString().substr(2, length);
  }
  
  createCouponId()
  {
    this.coupondata.couponkey = this.bitcoinService.getRandomPubkey();
    this.coupondata.couponid = "AX_"+this.coupondata.couponkey.substr(0, 9).toUpperCase();
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

  createCoupon() {
    this.showLoader();

   var p1 = this.getplandata(this.coupondata.couponplanid);
   this.coupondata.couponplan = JSON.stringify(p1);
   this.coupondata.vendorid = p1.vendorid;

   this.couponService.createCoupon(this.coupondata).then((result) => {
                this.loading.dismiss();
                this.coupon = result;
                                        console.log("coupon created");
                                }, (err) => {
                this.loading.dismiss();
 		this.alertCtrl.presentAlert(JSON.parse(err._body).error);
                                        console.log("not allowed"+ err);
                                });
  }

  getCoupon() {
    this.showLoader();

   var coupondata = {
        name: 'test'
   };
   this.couponService.getCoupon(coupondata).then((result) => {
                this.loading.dismiss();
                this.coupon = result;
                                        console.log("coupon created");
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
  
  activateCoupon(coupon){

    this.showLoader();

    var pauseactivate = {
	activate : true,
	pause: false,
        couponid : 1
    };

    this.couponService.pauseActivateCoupon(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.coupons.indexOf(coupon);

                if(index > -1){
                        this.coupons.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  pauseCoupon(coupon){

    this.showLoader();

    var pauseactivate = {
	activate : false,
	pause: true,
        couponid : 1
    };

    this.couponService.pauseActivateCoupon(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.coupons.indexOf(coupon);

                if(index > -1){
                        this.coupons.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
  
  getCouponBalance(coupon){

    this.showLoader();

    var coupondata = {
        activate : false,
        pause: true,
        couponid : 1
    };

    this.couponService.getCouponBalance(coupondata).then((result) => {

      this.loading.dismiss();
      this.balance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }



  
}

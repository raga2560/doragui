import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Coupon } from '../../providers/coupon';

/**
 * Generated class for the CouponRedeemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon-redeem',
  templateUrl: 'coupon-redeem.html',
})
export class CouponRedeemPage {


  coupons: any;
  coupon: any;
  balance: any;
  loading: any;
  coupondata: any;
  redeemstatus: any; 
  redeemdata: any;

  constructor(public navCtrl: NavController, public couponService: Coupon, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {

       this.coupondata = {
            couponid: ''
       };

       this.balance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };

       this.redeemdata = {
            couponpin: '',
            couponmetadata: '',
            redeemaddress: ''
       };

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
  
  validateCoupon() {
    this.showLoader();


   this.couponService.validateCoupon(this.coupondata).then((result) => {
                this.loading.dismiss();
                this.coupon = result;
                                        console.log("coupon created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                                });
  }

  getCoupon() {
    this.showLoader();


   this.couponService.getCoupon(this.coupondata.couponid).then((result: any) => {
                this.loading.dismiss();
//                alert(JSON.stringify(result));
                this.coupondata = result;
    this.coupondata.couponaddress = '2N5ZyMz5xmt47znM9CCKnrLbXmymGLknus9' ;
                        console.log("coupon retrieved");
                                }, (err) => {
                this.loading.dismiss();
                        console.log("coupon retreive failed  "+ err);
                                });
  }
  
  redeemCoupon(){

    this.showLoader();
    this.redeemdata.couponmetadata = this.coupon.couponplan;
    // in this example extracted from coupon

    this.couponService.redeemCoupon(this.coupon, this.redeemdata).then((result) => {

      this.loading.dismiss();
      this.redeemstatus = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  
  getCouponBalance(){

    this.showLoader();

    this.coupondata.couponaddress = '2N5ZyMz5xmt47znM9CCKnrLbXmymGLknus9' ;
    // AX_03138A00F
    this.couponService.getCouponBalance(this.coupondata).then((result) => {

      this.loading.dismiss();
      this.balance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }



  
}

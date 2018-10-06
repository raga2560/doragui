import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Coupon } from '../../providers/coupon';



/**
 * Generated class for the CouponsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupons',
  templateUrl: 'coupons.html',
})
export class CouponsPage {

  loading: any;
  coupons: any;

  constructor(public navCtrl: NavController,  public couponService: Coupon, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
  }

  ionViewDidLoad(){

    this.couponService.getCoupons().then((data) => {
                  this.coupons = data;
    }, (err) => {
        console.log("not allowed");
    });

  }

  refresh () {

    this.couponService.getCoupons().then((data) => {
                  this.coupons = data;
    }, (err) => {
        console.log("not allowed");
    });

  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }

  showCoupon(coupon) {
     this.navCtrl.push('CouponviewPage', {coupon: coupon});
  }




}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponRedeemPage } from './coupon-redeem';

@NgModule({
  declarations: [
    CouponRedeemPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponRedeemPage),
  ],
})
export class CouponRedeemPageModule {}

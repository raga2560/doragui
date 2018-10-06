import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponIssuePage } from './coupon-issue';

@NgModule({
  declarations: [
    CouponIssuePage,
  ],
  imports: [
    IonicPageModule.forChild(CouponIssuePage),
  ],
})
export class CouponIssuePageModule {}

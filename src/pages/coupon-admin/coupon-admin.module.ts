import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponAdminPage } from './coupon-admin';

@NgModule({
  declarations: [
    CouponAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponAdminPage),
  ]
})
export class CouponAdminPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentAcceptPage } from './payment-accept';

@NgModule({
  declarations: [
    PaymentAcceptPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentAcceptPage),
  ],
})
export class PaymentAcceptPageModule {}

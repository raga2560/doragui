import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentIssuePage } from './payment-issue';

@NgModule({
  declarations: [
    PaymentIssuePage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentIssuePage),
  ],
})
export class PaymentIssuePageModule {}

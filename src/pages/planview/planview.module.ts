import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanviewPage } from './planview';

@NgModule({
  declarations: [
    PlanviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanviewPage),
  ],
})
export class PlanviewPageModule {}

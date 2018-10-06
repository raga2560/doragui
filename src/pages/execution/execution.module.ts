import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExecutionPage } from './execution';

@NgModule({
  declarations: [
    ExecutionPage,
  ],
  imports: [
    IonicPageModule.forChild(ExecutionPage),
  ],
})
export class ExecutionPageModule {}

import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Planmanager } from '../../providers/planmanager';



/**
 * Generated class for the PlansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html',
})
export class PlansPage {

  loading: any;
  relations: any;

  constructor(public navCtrl: NavController,  public relationService: Planmanager, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
  }

  ionViewDidLoad(){
    var vendorid = 1;
    this.relationService.getAvailablePlans(vendorid).then((data) => {
                  this.relations = data;
    }, (err) => {
        console.log("not allowed");
    });

  }

  refresh () {
    var vendorid = 1;
    this.relationService.getAvailablePlans(vendorid).then((data) => {
                  this.relations = data;
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
  
  showPlan(plan) {
     this.navCtrl.push('PlanviewPage', {plan: plan});
  }



}

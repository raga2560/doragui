import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Planmanager } from '../../providers/planmanager';
import { Popservice } from '../../providers/popservice';


/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  loading: any;
  plan: any;
  plans: any;
  availableSchemes: any; 
 
  plandata : any;

  constructor(public navCtrl: NavController, 
              public planService: Planmanager,
              public loadingCtrl: LoadingController,
 	      public alertCtrl: Popservice,
	      public navParams: NavParams) {

       this.availableSchemes = [];
       this.plandata = {
	  vendorplanname: '',
          planscheme :'',
	  vendoraddress: 'placeholder',
	  vendorfixedfees : '',
          vendorpercentagefees: ''

       };
      this.getAvailableSchemes() ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }
  getAvailableSchemes() {

   var vendorid = 10;

   this.planService.getAvailableSchemes(vendorid).then((result) => {
                this.availableSchemes = result;
                console.log("got plans");
                       }, (err) => {
                console.log("getting plans failed "+ err);
                });
  }


  createPlan() {
    this.showLoader();

   this.planService.createPlan(this.plandata).then((result) => {
                this.loading.dismiss();
                this.plan = result;
                                        console.log("plan created");
                                }, (err) => {
                this.loading.dismiss();
                 this.alertCtrl.presentAlert(JSON.parse(err._body).error);
                                        console.log("not allowed"+ err);
                                });
  }

  getPlan() {
    this.showLoader();

   var plandata = {
        name: 'test'
   };

   var whichside = 1;

   this.planService.getPlan(plandata, whichside).then((result) => {
                this.loading.dismiss();
                this.plan = result;
                                        console.log("plan created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                               });
  }

 activatePlan(plan){

    this.showLoader();

    var pauseactivate = {
        activate : true,
        pause: false,
        planid : 1
    };

    this.planService.pauseActivatePlan(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.plans.indexOf(plan);

                if(index > -1){
                        this.plans.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

 pausePlan(plan){

    this.showLoader();

    var pauseactivate = {
        activate : false,
        pause: true,
        planid : 1
    };

    this.planService.pauseActivatePlan(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.plans.indexOf(plan);

                if(index > -1){
                        this.plans.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
}

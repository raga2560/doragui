import { Component  , ViewChild} from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Todos } from '../../providers/todos';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { ServerlessSendviewPage } from '../serverless-sendview/serverless-sendview';
import { ServerlessReceiveviewPage } from '../serverless-receiveview/serverless-receiveview';
import { ServerlessPayment } from '../../providers/serverlesspayment';
import { ServerlessWallet } from '../../providers/serverlesswallet';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {QRCodeComponent} from 'angular2-qrcode';



@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  loading: any;
  relationship = 'bitcoin';
  refreshEnable : any;
  sentTransactions: any;
  sendaddress= '';
  sendqrcode= '';
  addresstoreceive='';
  receivedTransactions: any; 
 @ViewChild(QRCodeComponent) qrcode: QRCodeComponent;


  constructor(public navCtrl: NavController, public todoService: Todos, public modalCtrl: ModalController, 
    public paymentService: ServerlessPayment,
    public walletService: ServerlessWallet,
     private qrScanner: QRScanner,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  this.refreshEnable = true;
  this.sentTransactions = '';
  this.receivedTransactions = '';
  this.walletService.initializeBitcoinWallet();
  this.walletService.initializeDashcoinWallet();
  }

  ionViewDidLoad(){

 this.paymentService.getPaymentsMade().then((data) => {
//         alert(JSON.stringify(data));
                  this.sentTransactions = data;
    }, (err) => {
        console.log("not allowed");
    });

 this.paymentService.getPaymentsReceived().then((data) => {
         // alert(JSON.stringify(data));
                  this.receivedTransactions = data;
    }, (err) => {
        console.log("not allowed");
    });


  }
  
  clear () {

   this.paymentService.clearPaymentsReceived();
   this.paymentService.clearPaymentsMade();
  }
  
  viewpaymentmade(payment) {

    this.navCtrl.push('ServerlessSendviewPage', {payment: payment});

  }
  viewpaymentreceived(payment) {

    this.navCtrl.push('ServerlessReceiveviewPage', {payment: payment});

  }


  loadTodos(){

  }

  addTodo(){

    let prompt = this.alertCtrl.create({
      title: 'Add Todo',
      message: 'Describe your todo below:',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: todo => {

      			if(todo){

              this.showLoader();

      				this.todoService.createTodo(todo).then((result) => {
                this.loading.dismiss();
                this.todos = result;
      					console.log("todo created");
      				}, (err) => {
                this.loading.dismiss();
      					console.log("not allowed");
      				});

      			}


          }
        }
      ]
    });

    prompt.present();

  }

  deleteTodo(todo){

    this.showLoader();

    //Remove from database
    this.todoService.deleteTodo(todo._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
  		let index = this.todos.indexOf(todo);

  		if(index > -1){
  			this.todos.splice(index, 1);
  		}   

    }, (err) => {
      this.loading.dismiss();
    	console.log("not allowed");
    });
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  logout(){
    
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }
 
  refresh() {
  this.refreshEnable = false;

setTimeout(()=>{    //<<<---    using ()=> syntax
  this.refreshEnable = true;
 }, 3000);
  
 }

}

import { Component  , ViewChild} from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { ServerlessSendviewPage } from '../serverless-sendview/serverless-sendview';
import { ServerlessReceiveviewPage } from '../serverless-receiveview/serverless-receiveview';
import { ServerlessPayment } from '../../providers/serverlesspayment';
import { ServerlessWallet } from '../../providers/serverlesswallet';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {QRCodeComponent} from 'angular2-qrcode';
import { Bitcoin } from '../../providers/bitcoin';




@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  relationship = 'bitcoin';
  refreshEnable : any;
  sentTransactions: any;
  scanSub : any;
  sendaddress= '';
  walletbalance: any;
  sendqrcode= '';
  wallet: any;
  receiveqrcode= '';
  addresstoreceive='';
  receivedTransactions: any; 
 @ViewChild(QRCodeComponent) qrcode: QRCodeComponent;


  constructor(public navCtrl: NavController,  public modalCtrl: ModalController, 
    public paymentService: ServerlessPayment,
  // public serverlessService: Serverless,
    public serverlessWallet: ServerlessWallet,
    public bitcoinService: Bitcoin,
    public walletService: ServerlessWallet,
     private qrScanner: QRScanner,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  this.refreshEnable = true;
  this.sentTransactions = '';
  this.receivedTransactions = '';
  this.walletbalance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };
  this.walletService.initializeBitcoinWallet().then(a=>{

  this.wallet = this.serverlessWallet.getBitcoinWallet();
  this.receiveqrcode= this.wallet.walletkeyaddress;
  this.getWalletBalance();

  });
  this.walletService.initializeDashcoinWallet();
  



  }

  ionViewDidLoad(){

 this.paymentService.getPaymentsMade().then((data) => {
//         alert(JSON.stringify(data));

		if(data == null) 
                  this.sentTransactions = '';
                else 
                  this.sentTransactions = data;

    }, (err) => {
        console.log("not allowed");
    });

 this.paymentService.getPaymentsReceived().then((data) => {
		if(data == null) 
                  this.receivedTransactions = '';
		else
                  this.receivedTransactions = data;
    }, (err) => {
        console.log("not allowed");
    });


  }
  
  getWalletBalance(){

    this.showLoader();

    this.bitcoinService.getBalances(this.wallet.walletkeyaddress).then((result) => {

      this.loading.dismiss();
      this.walletbalance = result;


    }, (err) => {
      this.loading.dismiss();
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




  scan () {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        console.log('Camera Permission Given');
         this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);
         this.sendqrcode = text;
         alert('Scanned something:'+ text);
         this.qrScanner.hide();
         this.scanSub.unsubscribe(); 
        
        });

        this.qrScanner.show();
      } else if (status.denied) {
        console.log('Camera permission denied');
      } else {
        console.log('Permission denied for this runtime.');
      }
    })
    .catch((e: any) => console.log('Error is', e));

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

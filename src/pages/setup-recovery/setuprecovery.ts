import { Component } from '@angular/core';
import { IonicPage, Platform, LoadingController, NavController, NavParams } from 'ionic-angular';
import {EmailComposer} from '@ionic-native/email-composer';
import { Bitcoin } from '../../providers/bitcoin';
import { Clipboard } from '@ionic-native/clipboard';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import * as pdfMake from '../../assets/js/pdfmake/pdfmake';
import * as pdfFonts from '../../assets/js/pdfmake/vfs_fonts';
import {  ToastController } from 'ionic-angular';

import { ServerlessWallet } from '../../providers/serverlesswallet';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generated class for the BalancesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setuprecovery',
  templateUrl: 'setuprecovery.html',
})
export class SetupRecoveryPage {

  loading: any;
  plan: any;
  plans: any;
  feesdata: any;
  walletbalance: any;
  externalwallet: any;
  wallet: any;
  pdfurl='';

  chargingdata: any;
  chargingamount : any;
  feesamount : any;
  serverless: any;
  feeslevel: any;
  availablePlans : any;
  relationship = 'bitcoin';
 
  plandata : any;
  pdfObj = null;

  constructor(public navCtrl: NavController, 
	      private emailComposer: EmailComposer,
              private clipboard: Clipboard,
              private plt: Platform,
              public bitcoinService: Bitcoin,
              public file: File, public toastCtrl: ToastController,
              public fileOpener: FileOpener,
              public serverlessWallet: ServerlessWallet,
              public loadingCtrl: LoadingController,
	      public navParams: NavParams) {

       this.serverless = {
	contractid: 'CONT1',
	balance: '',
	walletaddress: '',
	fees: '',

       };

       this.feeslevel = [
	 {levelname: "low", levelfees: 20},
	 {levelname: "medium", levelfees: 30},
	 {levelname: "high", levelfees: 50},

       ];
       this.wallet = this.serverlessWallet.getBitcoinWallet();

       this.externalwallet = {
         sendaddress: '',
         sendamount: ''
       };

       this.feesdata = {
	  address: '',
          balance: ''
       };

       this.chargingdata = {
	  address: '',
          balance: ''
       };
       this.walletbalance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };


       this.feesamount = "0";
       this.getWalletBalance();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  copyaddr() {
   this.clipboard.copy(this.walletbalance.address);
  }

  saveexternaladdress() {
       if(this.externalwallet.sendaddress == '')
       {
	 alert('Enter external address');
         return;
       }
       this.serverlessWallet.setExternalBitcoinWallet(this.externalwallet);
  }

  sendexternalamount() {
       var ext = this.serverlessWallet.getExternalBitcoinWallet();
       if(ext.sendaddress == '')
       {
	 alert('External address not set');
         return;
       }
       if(this.externalwallet.sendamount > this.walletbalance.balance)
       {
	 alert('No balance to send ');
         return;
       }
  
	 alert('Will be implemented shorty');
       // transfer code to be added here 
  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

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



createPdf() {
let self = this;
var recoverydata = {
  bitcoindata: this.wallet,
  dashcoindata: this.wallet,
  userid: 'UD5GT3456',
  checksum: '5ab456'
 };

 var docDefinition = {
      content: [
 
 
        { text: JSON.stringify(recoverydata), style: 'story', margin: [0, 20, 0, 20] },
 
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
  }
;

this.pdfObj = pdfMake.createPdf(docDefinition);

/*
alert("open");
this.pdfObj.open();
alert("print");

this.pdfObj.print();
*/
this.pdfObj.getDataUrl((dataUrl) => {
    this.pdfurl = dataUrl;
});


}

downloadPdf() {

    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
	console.log("data dir="+ this.file.dataDirectory);
	alert("before write data dir="+ this.file.dataDirectory);
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'WalletRec.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
	alert("after write data dir="+ this.file.dataDirectory);
          this.fileOpener.open(this.file.dataDirectory + 'WalletRec.pdf', 'application/pdf');
        })
     .catch((err) => {
       alert(err);
       console.error(err);
     });

      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download("WalletRec.pdf");
    }
 

  }

  sendEmail() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
	console.log("data dir="+ this.file.dataDirectory);
	alert("before write data dir="+ this.file.dataDirectory);
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'WalletRec.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
	alert("after write data dir="+ this.file.dataDirectory);
       let email = {
         to: 'email@email',
         attachments: [
           this.file.dataDirectory + 'WalletRec.pdf'
         ],

         subject: 'subject',
         body: 'body text...',
         isHtml: true
       };
       this.emailComposer.open(email);


     })
     .catch((err) => {
       alert(err);
       console.error(err);
     });

 });
}
}

  
}




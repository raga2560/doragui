import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { environment } from '../config/environment';

declare var foo;


let url = environment.url;

@Injectable()
export class ServerlessWallet {

  url : string;
  bitcoinwallet: any;
  dashcoinwallet: any;
  bitcoinexternalwallet: any;
  bitcoinwalletbalance: any;
  dashcoinexternalwallet: any;
  dashcoinwalletbalance: any;

  constructor(public http: Http, 
        private storage: Storage,
	public authService: Auth) {
     this.url = url;
     this.initializeBitcoinWallet();
     this.initializeDashcoinWallet();
     this.loadexternalbitcoinwallet();
//     this.loadexternaldashcoinwallet();

  }

  initializeDashcoinWallet(){
// 
   return this.initializeBitcoinWallet();
  }

  initializeBitcoinWallet(){

 var network = foo.bitcoin.networks.testnet;
          
  return new Promise((resolve, reject) => {



   this.storage.get('bitcoinwallet').then((data) => {
   console.log("data="+ data);
       if(data == null || data == {}) {
          var a =  foo.bitcoin.ECPair.makeRandom({ network: network, rng:foo.Randombytes });
        var dat = {
          walletwif: a.toWIF(),
          walletkeyaddress: a.getAddress()
        };
        this.storage.set('bitcoinwallet', dat);
        this.bitcoinwallet = dat;
        resolve (this.bitcoinwallet);
      }
        else {
        this.bitcoinwallet = data;
        resolve (this.bitcoinwallet);
        }

  }, err => {
	reject(err);
  });


});

  }

  loadexternalbitcoinwallet() {

   this.storage.get('bitcoinexternalwallet').then((data) => {
        this.bitcoinexternalwallet = data;
   })

  }

  getEncrypedBitcoinWallet(password:string){
//    alert(this.bitcoinwallet.walletwif);
   return new Promise((resolve, reject) => {
	var decoded = foo.Wif.decode(this.bitcoinwallet.walletwif)
   alert(JSON.stringify(decoded));
    var data = {
	encrypedwalletwif : foo.Bip38.encrypt(decoded.privateKey, decoded.compressed, password),
        walletaddress: this.bitcoinwallet.walleykeyaddress
        };
    resolve( data);
     });
  }


  getDecrypedBitcoinWallet(recoverywallet: any, password:string){
 alert(JSON.stringify(recoverywallet));
   var bitcoinwallet= recoverywallet.bitcoindata;
   var dashcoinwallet= recoverywallet.bitcoindata;

   return new Promise((resolve, reject) => {

   var 	decryptedKey =   foo.Bip38.decrypt(bitcoinwallet.encrypedwalletwif, password, function(status) {
    console.log(status.percent);

   });

    console.log("Now encoding");
    console.log(decryptedKey);
	var decrypedwalletwif = foo.Wif.encode( 239, decryptedKey.privateKey, decryptedKey.compressed);
    console.log(decrypedwalletwif);
        var addr = foo.bitcoin.ECPair.fromWIF(decrypedwalletwif, foo.bitcoin.networks.testnet).getAddress();
        console.log( addr);
    var data = {
	decrypedwalletwif : decrypedwalletwif,
        walletaddress: addr
        };
    resolve( data);
	


   });

  }



  getExternalBitcoinWallet(){

    return this.bitcoinexternalwallet;
  }

  getDashcoinWallet(){

    return this.dashcoinwallet;
  }

  getDashcoinWalletBalance(){
    return this.dashcoinwalletbalance;
  }

  getBitcoinWallet(){

    return this.bitcoinwallet;
  }

  getBitcoinWalletBalance(){

    return this.bitcoinwalletbalance;
  }
  
  setExternalBitcoinWallet(wal){
      this.storage.set('bitcoinexternalwallet', wal);
      this.bitcoinexternalwallet = wal;
  }

  createBitcoinWallet(walletdata){
      this.storage.set('bitcoinwallet', walletdata);
  }

  updateBitcoinWallet(walletdata){
      this.storage.set('bitcoinwallet', walletdata);
  }

  updateBitcoinWalletBalance(wb){
      this.storage.set('bitcoinwalletbalance', wb);
      this.bitcoinwalletbalance = wb ;
  }

  setExternalDashcoinWallet(wal){
      this.storage.set('dashcoinexternalwallet', wal);
      this.dashcoinexternalwallet = wal;
  }

  createDashcoinWallet(walletdata){
      this.storage.set('dashcoinwallet', walletdata);
  }

  updateDashcoinWallet(walletdata){
      this.storage.set('dashcoinwallet', walletdata);
  }

  updateDashcoinWalletBalance(wb){
      this.storage.set('dashcoinwalletbalance', wb);
      this.dashcoinwalletbalance = wb ;
  }


}

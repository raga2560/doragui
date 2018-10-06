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

  }

  initializeDashcoinWallet(){
  }

  initializeBitcoinWallet(){

 var network = foo.bitcoin.networks.testnet;
          



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
      }
        else {
        this.bitcoinwallet = data;
        }

  });

  }

  loadexternalbitcoinwallet() {

   this.storage.get('bitcoinexternalwallet').then((data) => {
        this.bitcoinexternalwallet = data;
   })

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

  createBitcoinWallet(todo){
      this.storage.set('bitcoinwallet', todo);
  }

  updateBitcoinWallet(todo){
      this.storage.set('bitcoinwallet', todo);
  }

  updateBitcoinWalletBalance(wb){
      this.storage.set('bitcoinwalletbalance', wb);
      this.bitcoinwalletbalance = wb ;
  }

  setExternalDashcoinWallet(wal){
      this.storage.set('dashcoinexternalwallet', wal);
      this.dashcoinexternalwallet = wal;
  }

  createDashcoinWallet(todo){
      this.storage.set('dashcoinwallet', todo);
  }

  updateDashcoinWallet(todo){
      this.storage.set('dashcoinwallet', todo);
  }

  updateDashcoinWalletBalance(wb){
      this.storage.set('dashcoinwalletbalance', wb);
      this.dashcoinwalletbalance = wb ;
  }


}

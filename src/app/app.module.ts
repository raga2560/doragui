import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { QRCodeModule } from 'angular2-qrcode';
import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ListPageModule } from '../pages/list/list.module';
import { ServerlessWalletPageModule } from '../pages/serverlesswallet/serverlesswallet.module';
import { SetupRecoveryPageModule } from '../pages/setuprecovery/setuprecovery.module';
import { RecoverWalletPageModule } from '../pages/recoverwallet/recoverwallet.module';

import { IonicStorageModule } from '@ionic/storage';
import { LoginPage } from '../pages/login-page/login-page';
import { EmailPage } from '../pages/email-page/email-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { Todos } from '../providers/todos';
import { Auth } from '../providers/auth';
import { Planmanager } from '../providers/planmanager';
import { Coupon } from '../providers/coupon';
import { Bitcoin } from '../providers/bitcoin';
import { Popservice } from '../providers/popservice';
import { Payment } from '../providers/payment';
import { Serverless } from '../providers/serverless';
import { ServerlessWallet } from '../providers/serverlesswallet';
import { ServerlessTransaction } from '../providers/serverlesstransaction';
import { ServerlessPayment } from '../providers/serverlesspayment';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CouponIssuePageModule } from '../pages/coupon-issue/coupon-issue.module';
import { PaymentIssuePageModule } from '../pages/payment-issue/payment-issue.module';
import { PlansPageModule } from '../pages/plans/plans.module';
import { CouponRedeemPageModule } from '../pages/coupon-redeem/coupon-redeem.module';
import { PaymentAcceptPageModule } from '../pages/payment-accept/payment-accept.module';
import { ServerlessSendPageModule } from '../pages/serverless-send/serverless-send.module';
import { ServerlessSendviewPageModule } from '../pages/serverless-sendview/serverless-sendview.module';
import { ServerlessReceivePageModule } from '../pages/serverless-receive/serverless-receive.module';
import { CouponAdminPageModule } from '../pages/coupon-admin/coupon-admin.module';
import { CouponsPageModule } from '../pages/coupons/coupons.module';
import { PaymentsmadePageModule } from '../pages/paymentsmade/paymentsmade.module';
import { PaymentsreceivedPageModule } from '../pages/paymentsreceived/paymentsreceived.module';
import { BalancesPageModule } from '../pages/balances/balances.module';
import { SerlessettingPageModule } from '../pages/serlessetting/serlessetting.module';
import { PlanviewPageModule } from '../pages/planview/planview.module';
import { CouponviewPageModule } from '../pages/couponview/couponview.module';


@NgModule({
  declarations: [
    MyApp,
    LoginPage, 
    EmailPage, 
    SignupPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HomePageModule,
    QRCodeModule,
    ListPageModule,
    PlansPageModule,
    ServerlessWalletPageModule,
    SetupRecoveryPageModule,
    RecoverWalletPageModule,
    PlanviewPageModule,
    CouponviewPageModule,
    BalancesPageModule,
    SerlessettingPageModule,
    CouponIssuePageModule,
    PaymentIssuePageModule,
    ServerlessSendPageModule,
    ServerlessSendviewPageModule,
    ServerlessReceivePageModule,
    CouponsPageModule,
    PaymentsmadePageModule,
    PaymentsreceivedPageModule,
    CouponRedeemPageModule,
    PaymentAcceptPageModule,
    CouponAdminPageModule,

    IonicModule.forRoot(MyApp, {
      mode: 'ios'}
      ),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, 
    EmailPage, 
    SignupPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Todos, 
    Planmanager, 
    Coupon, 
    Serverless, 
    Bitcoin, 
    Payment, 
    ServerlessPayment, 
    ServerlessTransaction, 
    ServerlessWallet, 
    Popservice, 
    SocialSharing,
    Clipboard,
    QRScanner,
    Auth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

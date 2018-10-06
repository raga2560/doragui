import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';


import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {BalancesPage} from '../pages/balances/balances';
import {SerlessettingPage} from '../pages/serlessetting/serlessetting';
import {CouponsPage} from '../pages/coupons/coupons';
import {ServerlessWalletPage} from '../pages/serverlesswallet/serverlesswallet';
import {RecoverWalletPage} from '../pages/recoverwallet/recoverwallet';
import {SetupRecoveryPage} from '../pages/setuprecovery/setuprecovery';
import {PaymentsmadePage} from '../pages/paymentsmade/paymentsmade';
import {PaymentsreceivedPage} from '../pages/paymentsreceived/paymentsreceived';
import {PlansPage} from '../pages/plans/plans';
import {CouponIssuePage} from '../pages/coupon-issue/coupon-issue';
import {PaymentIssuePage} from '../pages/payment-issue/payment-issue';
import {CouponRedeemPage} from '../pages/coupon-redeem/coupon-redeem';
import {PaymentAcceptPage} from '../pages/payment-accept/payment-accept';
import {ServerlessSendPage} from '../pages/serverless-send/serverless-send';
import {ServerlessReceivePage} from '../pages/serverless-receive/serverless-receive';
import {CouponAdminPage} from '../pages/coupon-admin/coupon-admin';

import {LoginPage} from '../pages/login-page/login-page';
import {SignupPage} from '../pages/signup-page/signup-page';
import {EmailPage} from '../pages/email-page/email-page';


@Component({
    templateUrl: 'app.html'
})
export class MyApp
{
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any, icon: string }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen)
    {
        this.initializeApp();

        // used for an example of ngFor and navigation

        /*
        */

        this.pages = [
            {title: 'Home', component: HomePage, icon: 'home'},
            /*
                 { title: 'Signup', component: SignupPage, icon: 'home' },
                 { title: 'Login', component: LoginPage, icon: 'home' },
                 { title: 'Email', component: EmailPage, icon: 'home' },
           */
            {title: 'Divider', component: '', icon: 'none'},
            {title: 'Wallet ', component: ServerlessWalletPage, icon: 'home'},
            {title: 'Wallet Access ', component: LoginPage, icon: 'home'},
            {title: 'Divider', component: '', icon: 'none'},
            {title: 'Setup Wallet Recovery', component: SetupRecoveryPage, icon: 'contact'},
            {title: 'Recover Wallet', component: RecoverWalletPage, icon: 'contact'},
            {title: 'Divider', component: '', icon: 'none'},
            /*
                  { title: 'Payment Issue', component: PaymentIssuePage, icon: 'contact' },
                  { title: 'Client Web/Mobile', component: PaymentAcceptPage, icon: 'contact' },
            */

            {title: 'Pay as Message', component: ServerlessSendPage, icon: 'contact'},
            {title: 'Receive Payment ', component: ServerlessReceivePage, icon: 'contact'},
            /*
                { title: 'Divider', component: '', icon: 'none' },
                { title: 'Payments made', component: PaymentsmadePage, icon: 'contact' },
                { title: 'Received payments ', component: PaymentsreceivedPage, icon: 'contact' },

                { title: 'Vendor Admin ', component: CouponAdminPage, icon: 'contact' },
                { title: 'Vendor Plans ', component: PlansPage, icon: 'contact' },
                { title: 'Vendor Balances ', component: BalancesPage, icon: 'contact' },
            */
            {title: 'Divider', component: '', icon: 'none'},
            {title: 'Payment Setting', component: SerlessettingPage, icon: 'contact'}
        ];

    }

    initializeApp()
    {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });


    }

    openPage(page)
    {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

}

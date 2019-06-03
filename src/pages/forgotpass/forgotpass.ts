import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
//import { NgForm } from '@angular/forms';

/**
 * Generated class for the ForgotpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'forgotpass.html',
})
export class ForgotpassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpassPage');
  }

  onSendForgotPassword() {
    this.navCtrl.popToRoot();
  }
}

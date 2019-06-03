import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserData} from "../../providers/user-data";

/**
 * Generated class for the EntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private User : UserData
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryPage');
  }

  OnLoginPage() {
    console.log('onloginpage');
    this.navCtrl.setRoot('LoginPage');
  }

  OnSignupPage() {
    this.navCtrl.push('SignupPage');
  }

}

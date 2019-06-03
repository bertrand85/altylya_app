import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage,NavController, AlertController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { AuthProvider } from '../../providers/auth/auth';
import { NetworkProvider } from "../../providers/network/network";
import { UserOptions } from '../../interfaces/user-options';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  errorMessage: string;
  login = {id: 0, username: '', password: '', token: '', usertype: 1, cgu: 1  };
  submitted = false;

  constructor(public navCtrl: NavController,
              private auth:AuthProvider,
              private user:UserData,
              private network:NetworkProvider,
              private alertCtrl : AlertController) {
    this.login.username = user.userInfo.username;
  }

  ionViewWillEnter() {
    console.log(this.network.isConnected);
  }
  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.user.userInfo.username = this.login.username;
      //this.user.userInfo.password = this.login.password;

      this.auth.login(this.login.username,this.login.password).subscribe(
        loginRes => this.afterLogin(loginRes) ,
        error =>  this.errorMessage = <any>error);
    }
   //this.navCtrl.push('MyelevagePage');
  }

  afterLogin(loginRes : any) {
    if (loginRes.status == 'ok') {
      this.user.isLogged = true;
      this.user.userInfo.session_id = loginRes.session_id;
      this.user.userInfo.id = loginRes.userid;
      this.user.setUserInfos();

      this.user.updateStatusFromWeb().then( (data)=>{
        this.navCtrl.setRoot(this.user.redirectToUserHomepage());
      });


    }
    else {
      this.showAlert(loginRes.error_description);
    }

  }

  onSignup() {
    this.navCtrl.push('SignupPage');
  }

  onForgotPassord() {
    this.navCtrl.push('ForgotpassPage');
  }

  showAlert(message : string, title:string='Erreur!') {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}

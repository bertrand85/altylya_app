import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController, Loading, AlertController} from "ionic-angular";
import { IonicPage, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  cgu : any;
  signup= {
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    avatar:"",
    mobile_phone:"",
    work_phone:"",
    usertype:1,

  };
  submitted = false;

  loading:Loading;

  constructor(public navCtrl: NavController,
              public LoadingCtrl:LoadingController,
              private toast : ToastController,
              public userData: UserData,
              private alertCtrl : AlertController) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    if(this.cgu==false) {
      this.showAlert('Vous devez accepter les CGU', 'Attention!');
      return false;
    }
    if (form.valid) {
      this.presentLoadingCustom();
      this.signup.email = this.signup.username;

      this.userData.signup(this.signup)
        .subscribe(
          result => {
            this.loading.dismiss();
            if(result.status=='ok') {
              this.userData.userInfo.username=this.signup.username;
              let toast = this.toast.create({
                message: `Compte crée`,
                duration: 2000
              });
              toast.present();
              this.navCtrl.push('LoginPage');
            }
            else {
              console.log(result);
              this.showAlert(result.error_description);
            }
          },
          error => {alert(error);this.loading.dismiss();}
        );

    }
  }

  presentLoadingCustom() {
    this.loading = this.LoadingCtrl.create({
      content: 'Enregistrement ...'
    });


    this.loading.present();
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

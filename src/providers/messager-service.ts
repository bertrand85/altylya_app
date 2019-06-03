import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastController, Loading, AlertController, LoadingController} from 'ionic-angular';
//import {tryCatch} from "rxjs/util/tryCatch";

/*
  Generated class for the MessagerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagerServiceProvider {

  loading:Loading;
  hasLoading = false;

  constructor(public http: HttpClient,
              private LoadingCtrl : LoadingController,
              private toast : ToastController,
              private alertCtrl : AlertController) {
    console.log('Hello MessagerServiceProvider Provider');
  }

  /**
   *
   * @param {string} content
   */
  presentLoadingCustom(content : string) {
    if(! this.hasLoading) {
      this.loading = this.LoadingCtrl.create({
      content: content
    });


      this.loading.present();
      this.hasLoading = true;
    }
  }

  /**
   *
   */
  dismissLoading() {
    if(this.hasLoading)
      this.loading.dismiss();
    this.hasLoading = false;

  }

  TaostMessage( msg:string, duration:number=2000) {
    let toast = this.toast.create({
      message: msg,
      duration: duration
    });
    toast.present();
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

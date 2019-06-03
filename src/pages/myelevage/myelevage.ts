import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {IonicPage, Loading, NavController, NavParams} from 'ionic-angular';
import { LoadingController, ToastController} from "ionic-angular";

import { ElevageDataProvider } from "../../providers/elevage-data";
import { UserData} from '../../providers/user-data';


/**
 * Generated class for the MyelevagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myelevage',
  templateUrl: 'myelevage.html',
})
export class MyelevagePage {
  errorMessage: string;
  elevagesegment: string = "general";

  myElevage : any;
  myElevageModel = {
    id: "0",
    name: "",
    numnational: "",
    streetone: "",
    streettwo: "",
    zipcode: "",
    city: "",
    lat: "",
    long: "",
    avatar: "",
    mobile_phone: "",
    work_phone: ""
  };

  loading:Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public LoadingCtrl:LoadingController,
              public user: UserData,
              public ElevageData : ElevageDataProvider,
              private toast : ToastController) {
    this.myElevage = this.myElevageModel;
  }

  /**
   * when view did load
    */
  ionViewDidLoad() {
    this.myElevage = Object.assign({}, this.user.elevage);
    console.log(this.myElevage);

  }

  /**
   * save elevage form
   * @param {NgForm} form
   */
  onSave(form: NgForm) {
    console.log(this.user.elevage);
    if (form.valid) { // form datas are valid
      this.presentLoadingCustom();
      this.ElevageData.postElevage(this.myElevage)
        .subscribe(
        result => {
          this.loading.dismiss();
          if(result.status=='ok') {
            //this.user.elevage=result.elevage;
            this.user.updateStatusFromWeb();
            let toast = this.toast.create({
                message: `Elevage sauvegardé!`,
                duration: 2000
              });
              toast.present();
          }
          else {
            alert(result.error_description);
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

  addBatiment() {

    this.navCtrl.push('BatimentPage', null);
  }

  deleteBatiment(itemId:  any, batiment_id:any) {
    console.log(itemId);
    this.presentLoadingCustom();
    this.ElevageData.deleteBatiment(batiment_id)
      .subscribe(
        result => {
          this.loading.dismiss();
          if(result.status=='ok') {
            this.user.batiments.splice(itemId,1);
            let toast = this.toast.create({
              message: `Batiment supprimé!`,
              duration: 2000
            });
            toast.present();
          }
          else {
            alert(result.error_description);
          }
        },
        error => {alert(error);this.loading.dismiss();}
      );
  }

  openBatiment( bat :any, index:any) {

    this.navCtrl.push('BatimentPage', {batiment:bat, index : index});
  }
}

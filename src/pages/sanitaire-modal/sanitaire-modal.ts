import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {lotTraitement} from "../../interfaces/lots";

/**
 * Generated class for the SanitaireModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sanitaire-modal',
  templateUrl: 'sanitaire-modal.html',
})
export class SanitaireModalPage {

  Data : lotTraitement;
  constructor(private view: ViewController,
              public navParams: NavParams) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad SanitaireModalPage');
    this.Data = this.navParams.get('data');

  }

  closeModalSanitaire() {
    const data = false;
    this.view.dismiss(data);
  }

  onSaveSanitaire(form: NgForm) {

    if (form.valid) {
      this.view.dismiss(this.Data);
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the SellingclientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sellingclient',
  templateUrl: 'sellingclient.html',
})
export class SellingclientPage {

  client = {};
  submitted = false;
  constructor( public navParams: NavParams,
               private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellingclientPage');
  }

  ionViewWillLoad() {
    const data = this.navParams.get('data')
    this.client = data.client;
    // this.dayData.traitements.push(this.newTraitement());
  }

  /**
   * fermer sans sauvegarder
   */
  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  /**
   * enregistre et ferme la modale
   * @param {NgForm} form
   */
  onSave(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.view.dismiss(this.client);
    }
  }

}

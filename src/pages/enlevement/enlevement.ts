import { Component } from '@angular/core';
import {IonicPage, ViewController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";

/**
 * Generated class for the EnlevementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enlevement',
  templateUrl: 'enlevement.html',
})
export class EnlevementPage {

  enlevement = {};
  lot : any;
  submitted = false;

  constructor(private view: ViewController,
              public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnlevementPage');
  }

  ionViewWillLoad() {
    const data = this.navParams.get('data')
    this.enlevement = data.enlevement;
    console.log(this.enlevement);
    this.lot = data.lot;
    // this.dayData.traitements.push(this.newTraitement());
  }

  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  onSave(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.view.dismiss(this.enlevement);
    }
  }
}

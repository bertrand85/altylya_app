import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ALTYLYA_API } from "../../interfaces/app-options";
import {UserData} from "../../providers/user-data";

/**
 * Generated class for the FicheElevagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fiche-elevage',
  templateUrl: 'fiche-elevage.html',
})
export class FicheElevagePage {

  lot_id : any;
  source : string;

  constructor(private view: ViewController,
              public navParams: NavParams,
              public user : UserData) {
  }

  ionViewWillLoad() {
    let d = this.navParams.get('data');
    this.lot_id = d.lot_id;
    this.source = ALTYLYA_API.urlapi2 + 'ficheelevage/' + this.lot_id + '?session_id=' + this.user.userInfo.session_id;
  }

  ionViewWillEnter()
  {
    const src = document.querySelector('#ficheelevage_src');
    console.log(src);
    src.setAttribute("src", this.source);
  }
  closeModal() {
    this.view.dismiss();
  }

}

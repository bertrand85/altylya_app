import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SellingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface sellings {
  date: string,
  type: string,
  nbclients_mail:number,
  nb_client_achat:number,
  termine:number
}

@IonicPage()
@Component({
  selector: 'page-selling',
  templateUrl: 'selling.html',
})
export class SellingPage {
  sellingsA : Array<sellings> = [
    {date:'01/06/2017', type:'poulets bio', nbclients_mail:150, nb_client_achat:125, termine:0},
    {date:'01/06/2017', type:'poulets bio', nbclients_mail:150, nb_client_achat:125, termine:0},
    {date:'01/06/2017', type:'poulets bio', nbclients_mail:150, nb_client_achat:125, termine:1},
    {date:'01/06/2017', type:'poulets bio', nbclients_mail:150, nb_client_achat:125, termine:1},
    {date:'01/06/2017', type:'poulets bio', nbclients_mail:150, nb_client_achat:125, termine:1},
    {date:'01/06/2017', type:'poulets bio', nbclients_mail:150, nb_client_achat:125, termine:1},

  ];

  ventes_en_cours =[{
    name : "Poulets Janvier 2018",
  },
    {
      name : "Veau Fev 2018",
    }];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellingPage');
  }

  gotoSellingClients() {
    this.navCtrl.push('SellingclientsPage');
  }

  addVente() {
    console.log('addvente');
  }

}

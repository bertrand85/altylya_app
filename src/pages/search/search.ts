import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EnlevementsProvider} from "../../providers/enlevements/enlevements";
import {MessagerServiceProvider} from "../../providers/messager-service";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  elevages : any ;

  constructor(public navCtrl: NavController,
              private enlevementsProvider: EnlevementsProvider,
              public navParams: NavParams,
              private message : MessagerServiceProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  recherche(data){
    let planurl = 'api/followedLot/search';
    this.enlevementsProvider.post(planurl, data)
    .then(data => {
      if(data['result'] == 'ok') {
        this.elevages = data['datas'];
        this.elevages = Array.of(this.elevages);
      }
      else {
        this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
      }

      });

  }

  demander(data){
    let planurl = 'api/followedLot/add';
    this.enlevementsProvider.post(planurl, data)
    .then(data => {
      if(data['result'] == 'ok') {
        this.message.showAlert('La demande est envoyée à l\'éleveur.', 'Terminé');
      }
      else {
        this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
      }

      });

  }

}

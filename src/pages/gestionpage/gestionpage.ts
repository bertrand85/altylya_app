import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions   } from 'ionic-angular';
import {FollowersDataProvider} from "../../providers/followers-data";
import {MessagerServiceProvider} from "../../providers/messager-service";
import {EnlevementsProvider} from "../../providers/enlevements/enlevements";



/**
 * Generated class for the GestionpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestionpage',
  templateUrl: 'gestionpage.html',
})
export class GestionPage {

  followedLots : any ;
  deleteFollower : any ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private FollowerData : FollowersDataProvider,
              private modal: ModalController,
              private enlevementsProvider: EnlevementsProvider,
              private message : MessagerServiceProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionpagePage');
    this.FollowerData.filter = '';
    this.getFollowed();
  }


  getItems(ev: any) {

    let val = ev.target.value;
    if(val == this.FollowerData.filter)
      return false;

    this.FollowerData.filter = val;
    this.getFollowed();
  }

  getFollowed() {
    this.message.presentLoadingCustom('');

    // get lot journal data
    this.FollowerData.getFollowedLots('1').then( (result:any) =>{
      if(result.status=='ok' ) {
        this.followedLots = result.liste;
        console.log(this.followedLots);
      };

      this.message.dismissLoading();

    });

  }

  deleteFollowed(i, id) {
    let planurl = 'api/followedLot/delete/'+id;
    this.enlevementsProvider.get(planurl)
    .then(data => {
      if(data['result'] == 'ok') {
        this.followedLots.splice(i,1);
        this.message.TaostMessage('Elevage supprimé',2000);
      }
      else {
        this.followedLots = [];
        this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
      }

      console.log(this.followedLots[0]);

      });

  }

  openPage(){
    this.navCtrl.push('SearchPage');
  }

}

import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {followers} from "../../interfaces/elevage_interface";
import {UserData} from "../../providers/user-data";
import { FollowersDataProvider } from "../../providers/followers-data";
import {MessagerServiceProvider} from "../../providers/messager-service";
import { FollowersProvider } from "../../providers/followers/followers";


/**
 * Generated class for the MysharingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface users {
  username: string,
  usertype:number,

}

@IonicPage()
@Component({
  selector: 'page-mysharing',
  templateUrl: 'mysharing.html',
})
export class MysharingPage {

  follower: any ;
  addNew = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private message : MessagerServiceProvider,
              private followersProvider: FollowersProvider,
              //private userData : UserData,
              //private followersData : FollowersDataProvider
              ) {
  }

  ionViewDidLoad() {
    this.getFollowers();
    console.log('ionViewDidLoad MysharingPage');

  }

  /**
   * get clients from local storage
   * @returns {Promise<any>}
   */
  getFollowers(){
    let planurl = 'api/followers';
    let i=0;
    this.followersProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.follower = data['datas'];
        }
        else {
          this.follower = [];
          this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
        }
        for(i=0;i<this.follower.length;i++){
          if((this.follower[i].actif == 1)){
            this.follower[i].actif = true;
          }
          else{
            this.follower[i].actif = false;
          }
        }

      });
  }

  onChangeStatus(i, id) {
    this.addNew = false;
    if(this.follower[i].actif == true){
      let planurl = 'api/followedLot/share/'+id;
      this.followersProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.message.TaostMessage('Statut enregistré',2000);
        }
        else {
          //this.follower[i].actif = false;
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        };
      });


    }
    else{
      let planurl = 'api/followedLot/unshare/'+id;
      this.followersProvider.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.message.TaostMessage('Statut enregistré',2000);
        }
        else {
          //this.follower[i].actif = true;
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        };
      });

    }
  }
}

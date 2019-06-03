import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions, ActionSheetController  } from 'ionic-angular';
import { Chart } from 'chart.js';


import { UserData } from '../../providers/user-data';
//import { MessagerServiceProvider } from '../../providers/messager-service';
import {FollowersDataProvider} from "../../providers/followers-data";
import {MessagerServiceProvider} from "../../providers/messager-service";
import {LotmargePage} from "../lotmarge/lotmarge";
//import {EnlevementsPage} from "../enlevements/enlevements";
//import {LotplanalimPage} from "../lotplanalim/lotplanalim";
;
/**
 * Generated class for the MydashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mydashboard',
  templateUrl: 'mydashboard.html',

})
export class MydashboardPage {
  @ViewChild('lineCanvas') lineCanvas;

  showchart = false;
  currentChart = '';

  lineChart: any;

  max_mortalite = 4;


  max_ic = 3;
  min_ic = 1;

  value = 67.5;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private User : UserData,
              private graphesDatas : FollowersDataProvider,
              private modal: ModalController,
              public actionSheetCtrl: ActionSheetController,
              public messager : MessagerServiceProvider,
              ) {
  }

  ionViewDidLoad() {
console.log('rr');
   }

  ionViewWillEnter () {
    console.log("ionViewWillEnter fired");
    //this.Messager.dismissLoading();
  }

  lotsettings(lot:any,i:any) {
    this.navCtrl.push('LotsettingsPage', {lot:lot, index : i});
  }

  lotjournal(lot:any,i:any) {
    this.navCtrl.push('LotjournalPage', {lot:lot, index : i});

  }

  lotjournalhisto(lot:any,i:any) {
    this.navCtrl.push('LotjournalhistoPage', {lot:lot, index : i});
  }

  lotMargeBrute(lot:any,i:any) {
    this.navCtrl.push('LotmargePage', {lot:lot, index : i});
  }
  lotenlevements(lot:any,i:any) {
    this.navCtrl.push('IcaeditorPage', {lot : lot, index : i});
  }

  lotjournalToday(lot,i) {
    this.navCtrl.push('LotjournalhistoPage', {lot:lot, index : i, showToday : true});
  }

  /**
   * lien vers page aliments
   * @param lot
   * @param i
   */
  lotaliments(lot:any,i:any) {
    //this.navCtrl.push('LotjournalPage', {lot:lot, index : i});
    this.navCtrl.push('LotplanalimPage', {lot:lot});
  }

  addLot() {

    this.navCtrl.push('LotsettingsPage', null);
  }

  getMortaliteDatas(lotId, index, parc) {
    if(this.currentChart == 'mortalite') {
      this.showchart = false;
      this.currentChart ='';
        return true;
    }
    this.messager.presentLoadingCustom('Chargement du graphique');
    this.graphesDatas.getFollowedMortalite(lotId, parc).then((result)=>{
      this.setMortaliteDatas(result,index);
      this.currentChart = 'mortalite';
    })
  }

  setMortaliteDatas(result, index) {
    if(result.status=='ok') {
      this.User.lots[index].other = result.datas;
      this.showchart = true;
    }
    this.messager.dismissLoading();
    console.log(this.User.lots[index].other);
  }

  getCroissanceDatas(lotId, index, parc) {
    /*if(this.currentChart == 'croissance') {
      this.showchart = true;
      this.currentChart = '';
      return true;
    }*/
    this.messager.presentLoadingCustom('Chargement du graphique');
    this.graphesDatas.getFollowedCroissance(lotId, parc).then((result)=>{
      this.setCroissanceDatas(result,index);
      this.currentChart = 'croissance';
    })
  }

  setCroissanceDatas(result, index) {
    if(result.status=='ok')
      this.User.lots[index].other = result.datas;
    this.showchart = true;
    this.messager.dismissLoading();
    console.log(this.User.lots[index].other);
  }

  lotficheelevage(lot_id) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = { 'lot_id': lot_id};
    const myModal: Modal = this.modal.create('FicheElevagePage', { data: myModalData }, myModalOptions);

    myModal.present();




  }

  presentActionSheet(lot_id : any, lot : any, i : any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Plus ...',
      buttons: [
        {
          text: 'Journal',
          handler: () => {
            this.lotjournalhisto(lot,i);
          }
        },
        {
          text: 'Plan production/aliments',
          handler: () => {
            this.lotaliments(lot,i);
          }
        },
        {
          text: 'Enlèvements',
          handler: () => {
            this.lotenlevements(lot,i);
          }
        },
        {
          text: 'Marge',
          handler: () => {
            this.lotMargeBrute(lot,i);
          }
        }
      ]
    });
    actionSheet.present();
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.User.updateStatusFromWeb();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}

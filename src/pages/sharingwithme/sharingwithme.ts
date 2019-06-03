import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions   } from 'ionic-angular';
import {FollowersDataProvider} from "../../providers/followers-data";
import {MessagerServiceProvider} from "../../providers/messager-service";

/**
 * Generated class for the SharingwithmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sharingwithme',
  templateUrl: 'sharingwithme.html',
})
export class SharingwithmePage {
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartType:string = 'line';

  options_mortalite = {
    min: 0,
    max: 4,
    title: 'Mortalité %',
    gaugeWidthScale: 0.3,
    decimals : 2,
    valueMinFontSize : '35px',
    titleMinFontSize : '20px',
  };
  max_mortalite = 4;
  options_poids = {
    min: 0,
    title: 'Poids (Kg)',
    gaugeWidthScale: 0.3,
    decimals : 3,
    valueMinFontSize : '35px',
    titleMinFontSize : '20px',
  };
  max_poids = 7;
  options_ic = {
    min: 0,
    title: 'Indice Conso.',
    gaugeWidthScale: 0.3,
    decimals : 2,
    valueMinFontSize : '35px',
    titleMinFontSize : '20px',
  };
  max_ic = 3;
  min_ic = 1;

  value = 67.5;

  followedLots : any ;
  lineChart: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private FollowerData : FollowersDataProvider,
              private MessageService : MessagerServiceProvider,
              private graphesDatas : FollowersDataProvider,
              private modal: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharingwithmePage');
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
    this.MessageService.presentLoadingCustom('');

    // get lot journal data
    this.FollowerData.getFollowedLots('0').then( (result:any) =>{
      if(result.status=='ok' ) {
        this.followedLots = result.liste;
        console.log(this.followedLots);
      };

      this.MessageService.dismissLoading();

    });

  }

  getFollowedMortalite(lotid : number, id : number, index : number) {
    this.MessageService.presentLoadingCustom('');

    // get lot journal data
    this.FollowerData.getFollowedMortalite(id,1).then( (result:any) =>{
      if(result.status=='ok' ) {


        this.followedLots[lotid].lots[index].results = result.datas;
        let clone = JSON.parse(JSON.stringify(this.followedLots[lotid].lots[index].results));
        clone[0].data = result.datas[0].data;
        this.followedLots[lotid].lots[index].results = clone;

        console.log(this.lineChartData );
      };

      this.MessageService.dismissLoading();

    });

  }

  getMortaliteDatas(lotId, id : number, index : number, parc : number) {
    this.graphesDatas.getFollowedMortalite(id,parc).then((result)=>{
      this.setMortaliteDatas(result, lotId ,index);

    })
  }

  setMortaliteDatas(result, lotId, index) {
    if(result.status=='ok')
      this.followedLots[lotId].lots[index].other = result.datas;
    console.log(this.followedLots[lotId].lots[index].other);
  }

  getCroissanceDatas(lotId, id : number, index : number, parc : number) {
    this.graphesDatas.getFollowedCroissance(id,parc).then((result)=>{
      this.setCroissanceDatas(result, lotId,index);

    })
  }

  setCroissanceDatas(result, lotId, index) {
    if(result.status=='ok')
      this.followedLots[lotId].lots[index].other = result.datas;
    console.log(this.followedLots[lotId].lots[index].other);
  }

  open(elem) {
    console.log (elem);
  }

  lotficheelevage(lot_id) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = { 'lot_id': lot_id};
    const myModal: Modal = this.modal.create('FicheElevagePage', { data: myModalData }, myModalOptions);

    myModal.present();

  }

  openPage(){
    this.navCtrl.push('GestionPage');
  }
}

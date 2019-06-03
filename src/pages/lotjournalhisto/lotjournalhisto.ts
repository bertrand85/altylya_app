import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';
import {  ToastController} from "ionic-angular";

import Moment from 'moment';
import { extendMoment } from 'moment-range';


const moment = extendMoment(Moment);
//import { extendMoment } from 'moment-range';

import { UserData } from '../../providers/user-data';
import { LotDataProvider } from '../../providers/lot-data';
import { JournalDataProvider } from '../../providers/journal-data';
import {lotDailyData, lotJournal} from "../../interfaces/lots";
import {MessagerServiceProvider} from "../../providers/messager-service";

/**
 * Generated class for the LotjournalhistoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lotjournalhisto',
  templateUrl: 'lotjournalhisto.html',
})
export class LotjournalhistoPage {
  dayInMilliSecond = 24*60*60*1000;
  selectedDate : string;
  firstDayLetter = [];
  todayIsDayNumber : number;
  showToday = false;
  lot : any;
  lot_index : any;

  journal : Array<any> =[] ;
  journal_index : number;
  dayData : lotDailyData;

  show = {
    mort : 1,
    aliment : 1,
    poids : 1,

  }

  avicalendar : Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              //public LotData : LotDataProvider,
              private JournalData : JournalDataProvider,
              private MessageService : MessagerServiceProvider,
              private user : UserData,
              private modal: ModalController,
              private toast : ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LotjournalhistoPage');

    console.log('ionViewDidLoad LotjournalPage');
    moment.locale('fr'); // set to french
    this.selectedDate = moment().format('L'); //

    if(this.navParams.data.lot!=undefined)
      this.lot = Object.assign({}, this.navParams.data.lot.definition);
    if(this.navParams.data.index!=undefined)
      this.lot_index = this.navParams.data.index;
    if(this.navParams.data.showToday!=undefined)
      this.showToday = true;


    this.todayIsDayNumber = moment.range(this.lot.date_entree,moment()).diff('days');

    this.MessageService.presentLoadingCustom('');
    this.calcAviCalendar();
    // get lot journal data
    this.JournalData.getJournal(this.lot.id).then( (result:any) =>{
      if(result.journal && result.journal.length>0) {
        this.journal = result.journal;
        this.completeAviCalendar();
      };
      if(this.showToday) {
        if (this.todayIsDayNumber > this.avicalendar[this.avicalendar.length - 1][6].dayFromStart) {
          this.dayClicked(this.avicalendar[this.avicalendar.length - 1][6].dayFromStart);
        }
        else {
          this.dayClicked(this.todayIsDayNumber);
        }
      }

      this.MessageService.dismissLoading();



    });

  }

  calcAviCalendar() {
    for(var i=0;i<14;i++) {
      let weekW = [];
      for(var j=0;j<7;j++) {
        let dayD = {day:this.calcDay(j,i),mort: '&nbsp;', aliment: '&nbsp;', veto: false, poids:'&nbsp;', dayFromStart: (i*7)+(j)};
        weekW.push(dayD);
      }
      this.avicalendar.push(weekW);
    }

    /*for(var j=0;j<210;j++) {
      let dayD = {mort:'', aliment:'',veto:false};

      this.avicalendar[Math.floor(j/7)][].push(dayD);
    }*/

    console.log(this.avicalendar);
  }

  completeAviCalendar(update : boolean=false) {

    let calendar = this.avicalendar;
    this.journal.forEach(function(element) {
      let week = Math.floor(element.day/7);
      let dayInWeek = element.day-(7*Math.floor(element.day/7));

      if(parseInt(element.mort_matin)+parseInt(element.mort_soir)>0)
        calendar[week][dayInWeek].mort = parseInt(element.mort_matin)+parseInt(element.mort_soir);
      else if(update)
        calendar[week][dayInWeek].mort = '';

      if(parseInt(element.mort_matin_p2)+parseInt(element.mort_soir_p2)>0)
        calendar[week][dayInWeek].mort_p2 = parseInt(element.mort_matin_p2)+parseInt(element.mort_soir_p2);
      else if(update)
        calendar[week][dayInWeek].mort_p2 = '';

      if(element.aliment && element.aliment>0) {
        calendar[week][dayInWeek].aliment = parseInt(element.aliment);
      }
      else if(update)
        calendar[week][dayInWeek].aliment = '&nbsp;';
      if(element.poids && element.poids>0) {
        calendar[week][dayInWeek].poids = parseInt(element.poids);
      }
      else if(update)
        calendar[week][dayInWeek].poids = '&nbsp;';


    })

  }

  /**
   *
   * @param dayNumber
   * @param weekNumber
   */
  calcDay(dayNumber, weekNumber) {

    if(dayNumber==0) {
      for(let j=0; j<7; j++ ) {
        this.firstDayLetter.push( moment(this.lot.date_entree).add(j,'days').format('dd') );

      }
    }

    return moment(this.lot.date_entree).add(dayNumber+(weekNumber*7),'days').format('DD');
  }

  /**
   * Click on a day in calendar
   */
  dayClicked(dayNumber) {
    console.log(dayNumber);
    let d = this.journal.findIndex( function (element, index) {
      return element.day==dayNumber;
    });


    if(d>=0) {
      this.journal_index=d;
      this.dayData = Object.assign({}, this.journal[d]);
    }
    else {
      this.journal_index=-1;
      this.dayData = this.getNewDay();
      this.dayData.day = dayNumber;
    }
    this.dayData.date = moment(this.lot.date_entree).add(dayNumber,'days').format('L')
    console.log(this.dayData);

    this.openModal(this.dayData);
  }

  getNewDay():lotDailyData {
    return {
      id             : 0,
      lot_id         : this.lot.id,
      date           : moment().format('L'),
      day            : 0,
      mort_matin     : 0,
      mort_midi      : 0,
      mort_soir      : 0,
      poids          : 0,
      mort_matin_p2  : 0,
      mort_midi_p2   : 0,
      mort_soir_p2   : 0,
      poids_p2       : 0,
      aliment        : 0,
      aliment_stock  : 0,
      eau            : 0,
      indice_conso   : 0,
      traitements    : [],
      description    : '',
    }
  }

  openModal(Data : any) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {'Data' : Object.assign({}, Data),
                          'lot': this.lot};
    const myModal: Modal = this.modal.create('JournalmodalPage', { data: myModalData }, myModalOptions);

    myModal.present();


    myModal.onWillDismiss((data) => {

      if(data) {
        console.log("I'm about to dismiss");
        console.log(data);
        this.saveData(data);
      }

    });

  }

  saveData(data : any) {
    this.MessageService.presentLoadingCustom('Enregistrement');
    this.JournalData.postJournal(data)
      .subscribe(
        result => {
          //this.loading.dismiss();
          if(result.status=='ok') {
            if(this.journal_index>=0) {
              this.journal[this.journal_index] = result.response.day;
            }
            else {
              this.dayData = result.response.day;
              this.journal.push(result.response.day);
            }
            this.user.lots[this.lot_index].instant_datas = result.response.instant_datas;
            this.completeAviCalendar(true);
            let toast = this.toast.create({
              message: `Journée sauvegardé!`,
              duration: 2000
            });
            toast.present();
          }
          else {
            alert(result.error_description);
          }
          this.MessageService.dismissLoading();
        },
        error => {console.log(error); this.MessageService.dismissLoading();
        }
      );
  }
}

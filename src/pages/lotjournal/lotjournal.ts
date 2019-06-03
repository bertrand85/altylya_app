import { Component } from '@angular/core';
import { IonicPage, Loading, NavController, NavParams,ModalController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, CalendarComponentOptions, DayConfig  } from "ion2-calendar";
import { LoadingController, ToastController} from "ionic-angular";
import { NgForm } from '@angular/forms';
import Moment from 'moment';
import { extendMoment } from 'moment-range';


const moment = extendMoment(Moment);
//import { extendMoment } from 'moment-range';

import { UserData } from '../../providers/user-data';
import { LotDataProvider } from '../../providers/lot-data';
import { JournalDataProvider } from '../../providers/journal-data';
import {lotDailyData} from "../../interfaces/lots";
import {MessagerServiceProvider} from "../../providers/messager-service";

//const moment = extendMoment(Moment);
// for calendar module : https://github.com/HsuanXyz/ion2-calendar

/**
 * Generated class for the LotjournalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lotjournal',
  templateUrl: 'lotjournal.html',
})
export class LotjournalPage {
  dayInMilliSecond = 24*60*60*1000;
  selectedDate : string;

  lot : any;
  lot_index : any;

  journal : Array<any> =[] ;
  journal_index : number;
  dayData : lotDailyData;

  loading:Loading;

  dateRange: { from: string; to: string; };
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  _daysConfig: DayConfig[] = [];
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    daysConfig: this._daysConfig,

  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public LoadingCtrl:LoadingController,
              //public LotData : LotDataProvider,
              private JournalData : JournalDataProvider,
              private toast : ToastController,
              private MessageService : MessagerServiceProvider,
              private user : UserData) {

    console.log('ionViewDidLoad LotjournalPage');
    moment.locale('fr'); // set to french
    this.selectedDate = moment().format('L');

    if(this.navParams.data.lot!=undefined)
      this.lot = Object.assign({}, this.navParams.data.lot.definition);
    if(this.navParams.data.index!=undefined)
      this.lot_index = this.navParams.data.index;

console.log(this.lot);
    // calendar options

      this._daysConfig.push({
        date: moment(this.lot.date_entree).toDate(),
        subTitle: `25`
      })

     this.optionsRange.from =  moment(this.lot.date_entree).toDate();
    this.optionsRange.to = moment().add(6,'months').toDate();


    this.dayData = this.getNewDay();
    this.MessageService.presentLoadingCustom('');
    // get data
    this.JournalData.getJournal(this.lot.id).then( (result:any) =>{
      if(result.journal && result.journal.length>0) {
        this.journal = result.journal;
        let resultats = this.JournalData.calc_resultats_lot(result.journal)
        if(resultats) {
          this.user.lots[this.lot_index].instant_datas.txmortalite = (resultats.mortalite/this.lot.nombre)*100;
          this.user.lots[this.lot_index].instant_datas.poids = resultats.poids/1000;
          this.user.lots[this.lot_index].instant_datas.indiceconso = ((resultats.aliment/this.lot.nombre)/(resultats.poids))*1000;


          console.log( this.lot.resultats);
        }
      }

      let dayFromLotEntry = this.dayFromEntry( moment(this.lot.date_entree).toDate(),moment());
      let d = this.journal.find( function (element, index) {
        return element.day==dayFromLotEntry;
      });

      if(d) {
        this.dayData = Object.assign({}, d);
      }
      else {
        this.dayData = this.getNewDay();
        this.dayData.day = dayFromLotEntry;
        this.dayData.date = this.selectedDate;
      }

      this.MessageService.dismissLoading();

    });


  }

  ionViewDidLoad() {


  }



  getNewDay():lotDailyData {
    return {
      id             : 0,
      lot_id         : this.lot.id,
      date           : moment().format('L'),
      day            : this.dayFromEntry(moment(this.lot.date_entree).toDate(),moment()),
      mort_matin     : 0,
      mort_midi      : 0,
      mort_soir      : 0,
      mort_matin_p2  : 0,
      mort_midi_p2   : 0,
      mort_soir_p2   : 0,
      poids          : 0,
      poids_p2       : 0,
      aliment        : 0,
      aliment_stock  : 0,
      eau            : 0,
      indice_conso   : 0,
      traitements    : [],
      description    : '',
    }
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'Journal',
      from : moment(this.lot.date_entree).toDate(),
      to : moment().add(6,'months').toDate(),

    };

    console.log(options);
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options,
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date, type) => {

      if(type=='done') {
        this.selectedDate = moment(date.string).format('L');
        let dayFromLotEntry = this.dayFromEntry( moment(this.lot.date_entree).toDate(),moment(date.string));

        let d = this.journal.find( function (element, index) {
          return element.day==dayFromLotEntry;
        });

        if(d) {
          this.dayData = Object.assign({}, d);
        }
        else {
          this.dayData = this.getNewDay();
          this.dayData.day = dayFromLotEntry;
          this.dayData.date = this.selectedDate;
        }
      }
    })
  }


  onSave(form: NgForm) {
    if (form.valid) {
      this.journal.push(this.dayData);
    }

    if (form.valid) {
      //this.presentLoadingCustom();
      this.JournalData.postJournal(this.dayData)
        .subscribe(
          result => {
            //this.loading.dismiss();
            if(result.status=='ok') {
              if(this.journal_index>=0) {
                this.journal[this.journal_index] = result.response.day;
              }
              else {
                this.dayData = result.response.day;
                this.journal.push(result.day);
              }
              this.user.lots[this.lot_index].instant_datas = result.response.instant_datas;

              let toast = this.toast.create({
                message: `Journée sauvegardé!`,
                duration: 2000
              });
              toast.present();
            }
            else {
              alert(result.error_description);
            }
          },
          error => {console.log(error); //this.loading.dismiss();
             }
        );
    }
  }

  dayFromEntry(start : any, end : any ) {
    return Math.floor( moment.range(start,end).valueOf()  / this.dayInMilliSecond);
  }

  presentLoadingCustom() {
    this.loading = this.LoadingCtrl.create({
      content: 'Enregistrement ...'
    });


    this.loading.present();
  }

}

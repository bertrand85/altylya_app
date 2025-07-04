import {Component, ViewChild} from '@angular/core';
import {IonicPage, Loading, NavController, NavParams, Slides} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController} from "ionic-angular";

import { UserData } from '../../providers/user-data';
import { LotDataProvider } from '../../providers/lot-data';
//import {lotInterface} from "../../interfaces/lots";

import Moment from 'moment';
import { extendMoment } from 'moment-range';


const moment = extendMoment(Moment);

//using https://github.com/HsuanXyz/ion2-calendar
/**
 * Generated class for the LotsettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lotsettings',
  templateUrl: 'lotsettings.html',
})

export class LotsettingsPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;


  lotsegment: string = "general";

  lot : any;
  lot_index : any = -1;
  other_data : any;

  loading:Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private User : UserData,
              public LoadingCtrl:LoadingController,
              public LotData : LotDataProvider,
              private toast : ToastController) {

    this.lot = this.newLot();

    if(this.navParams.data.lot!=undefined)
      this.lot = Object.assign({}, this.navParams.data.lot.definition);
    if(this.navParams.data.index!=undefined)
      this.lot_index = this.navParams.data.index;

    this.other_data = {
      groupement : '',
      accouvoir  : '',
      souche     : '',
    };
    console.log(this.lot.id);
  }

// Initialize slider
  ionViewDidEnter(){
    this.slideChanged();
  }

  // On segment click
  selectedTab(index) {
    this.slider.slideTo(index);
    console.log("selectedTab",index)
  }


  // On slide changed
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    let slides_count = this.segments.nativeElement.childElementCount;

    this.page = currentIndex.toString();
    if(this.page >= slides_count)
      this.page = (slides_count-1).toString();

    console.log("slides_count",slides_count)
    console.log("this.page",this.page)
    this.centerScroll();
  }

  // Center current scroll
  centerScroll(){
    if(!this.segments || !this.segments.nativeElement)
      return;

    let sizeLeft = this.sizeLeft();
    let sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent/2) ;

    result = (result > 0) ? result : 0;
    this.smoothScrollTo(result);
  }

  // Get size start to current
  sizeLeft(){
    let size = 0;
    for(let i = 0; i < this.page; i++){
      size+= this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }

  // Easing function
  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }

  // Animate scroll
  smoothScrollTo(endX){
    let startTime = new Date().getTime();
    let startX = this.segments.nativeElement.scrollLeft;
    let distanceX = endX - startX;
    let duration = 400;

    let timer = setInterval(() => {
      var time = new Date().getTime() - startTime;
      var newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }


  newLot() {
    moment.locale('en'); // set to french

    var lot = {
         id: 0,
        elevage_id: this.User.elevage.id,
        batiment_id: "",
        name: "",
        nombre: "",
        nombre_p2:"",
        accouvoir_id: 0 ,
        date_entree: moment().format('YYYY-MM-DD'),
        espece_id: "",
        destination_id: "",
        sexe : 1,
        groupement_id: 0,
        souche_id: 0,
        status : 1,

    };

    return lot;
  }

  onSave(form: NgForm) {
    if (form.valid) {
      this.presentLoadingCustom();
      let data = {
        lot : this.lot,
        other_data : this.other_data
      }
      this.LotData.postLot(data)
        .subscribe(
          result => {
            this.loading.dismiss();
            if(result.status=='ok') {
              /*if(this.lot_index>=0) // lot déjà éxistant
                this.User.lots[this.lot_index].definition = result.lot;
              else {
                // nouveau lot
                let newLot : lotInterface = {
                  definition : result.lot,
                  instant_datas : null,
                  journal : [],
                  other : []
                };
                this.lot.id=result.lot.id; // implémente l'id du lot en cours en création, sinon risque de doublons
                this.User.lots.push(newLot); // met le nouveau lot dans le tableau
                this.lot_index = this.User.lots.length - 1;
              }*/
              /*if(this.lot_index==-1)
                this.User.justAddLot = result.lot.id;*/
              this.User.updateStatusFromWeb();
              this.navCtrl.pop();
              let toast = this.toast.create({
                message: `Lot sauvegardé!`,
                duration: 2000
              });
              toast.present();

            }
            else {
              alert(result.error_description);
            }
          },
          error => {alert(error);this.loading.dismiss();}
        );
    }
  }

  presentLoadingCustom() {
    this.loading = this.LoadingCtrl.create({
      content: 'Enregistrement ...'
    });


    this.loading.present();
  }

  batChange() {
    console.log('trtr');
   // batimentListe.find(function(element,lot.batiment_id ){return element.id=lot.batiment_id}).name
  }
}

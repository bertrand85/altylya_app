import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {isDefined} from 'ionic-angular/util/util';
import 'rxjs/add/operator/catch';

import {ALTYLYA_API} from '../../interfaces/app-options';
import {MessagerServiceProvider} from "../messager-service";
import {UserData} from "../user-data";

/**
 * interface pour un élément du plan de production
 */
export interface planPeriodes {
  id                : number,
  lot_id            : number,
  aliment_type      : number,
  aliment_nom       : string,
  age_debut         : number,
  age_fin           : number,
  qtte_par_animal   : number,
  poids_objectif    : number,
  poids_objectif_p2 : number,
  etapes            : Array<planPeriodeEtape>,
  ic_objectif       : number
}

export interface planPeriodeEtape {
  id                : number,
  semaine           : number, // numero de la semaine
  poids_objectif    : number, // en fin de la semaine
  poids_objectif_p2 : number,
  mort_objectif     : number,
  mort_objectif_p2  : number,
  ic_objectif       : number,
  interventions     : string,
  observations      : string
}

/**
 * Provider pour la gestion du plans de production d'un lot
 */
@Injectable()
export class ProductionplanProvider {

  planPeriodes : Array<planPeriodes> = [];
  lotId      : number;
  duplicatingLot : Array<any>;

  constructor( public http: HttpClient,
               private user : UserData,
               private message : MessagerServiceProvider) {
  }

  /**
   * initialise le provider avec un plan
   * @param {Array<planPeriodes>} plan
   */
  init( lotId : number, plan : Array<planPeriodes> = [] ) {
    this.lotId = lotId;
    this.planPeriodes = plan;
    this.duplicatingLot = [];
  }

  /**
   * ajout d'une nouvelle periode dans le plan
   */
  addPlanPeriode() {

    this.planPeriodes.push(this.newPlanPeriode());

  }

  newPlanPeriode() {
    const newPlanPeriode : planPeriodes = {id:0, lot_id:this.lotId, aliment_type:1,
      aliment_nom:'', age_debut:0, age_fin:0, qtte_par_animal:0, poids_objectif :0, poids_objectif_p2 :0, etapes:[],  	ic_objectif :0  }

    return newPlanPeriode;
  }

  /**
   * supprime une periode du plan
   * @param {number} periodeIndex
   */
  deletePeriode(periodeIndex : number) {

    this.planPeriodes.splice(periodeIndex,1);

  }

  /**
   * dupliquer un plan pour un lot depuis un autre lot
   * @param {number} fromLotId
   */
  duplicate( fromLotId : number) {
    let planurl = 'api/plan/lotduplicate/' + this.lotId;
    let data = {'from':fromLotId};
    this.post(planurl,data)
      .then(data => {
        if(data['result'] == 'ok') {
          this.planPeriodes = data['datas'];
          this.message.TaostMessage('Plan dupliqué',2000);
          this.duplicatingLot = [];
        }
        else {
          this.message.TaostMessage('Erreur d\'enregistrement',2000);
        }
      });
  }

  getForDuplicate(lotId : number) {
    let planurl = 'api/plan/lotduplicate/' + lotId;

    this.get(planurl)
      .then(data => {
        if(data['result'] == 'ok') {
          this.duplicatingLot = data['datas'];
          console.log(data['datas']);
        }
        else {
          console.log('no data');
        }

      });
  }

  /***************************************************************************************************************
   * Gestion des etapes d'un plan
   */

  recalculateEtapes(planPeriode : planPeriodes) {
    const newEtapes : Array<planPeriodeEtape> = [];

    let semaine_debut = Math.floor(planPeriode.age_debut/7);
    let semaine_fin   = Math.floor(planPeriode.age_fin/7);

    let nb_etapes = semaine_fin-semaine_debut;
    let index = 0;

    for( var i=semaine_debut+1; i<=semaine_fin; i++ ) {

      if(isDefined(planPeriode.etapes) && planPeriode.etapes!=null && isDefined(planPeriode.etapes[index])) {
        planPeriode.etapes[index].semaine = i;
        newEtapes.push(planPeriode.etapes[index])
      }
      else {
        let newEtape : planPeriodeEtape = { "id":0, "semaine":i, "poids_objectif":0, "poids_objectif_p2":0, "mort_objectif":0, "mort_objectif_p2":0,"ic_objectif":0,"interventions":'',"observations":''};
        newEtapes.push(newEtape);
      };
      index ++;
    };

    planPeriode.etapes = newEtapes;

  }

  /*******************************************************************************************************************
   * http
   */
  /**
   * post plan d'alim
   * @param service
   * @param data
   * @returns {Promise<any>}
   */
  post(service, data) {
    let url = ALTYLYA_API.urlapi2+service;
    console.log (url);
    this.message.presentLoadingCustom('Enregistrement...');
    return new Promise(resolve => {
      this.http.post(url, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .subscribe(data => {
          resolve(data);
          this.message.dismissLoading();

        }, err => {
          this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
          this.message.dismissLoading();
          console.log(err);
        });
    });
  }

  /**
   * get
   * @param service
   * @returns {Promise<any>}
   */
  get(service) {
    let url = ALTYLYA_API.urlapi2+service;
    console.log (url);
    this.message.presentLoadingCustom('Chargement...');
    return new Promise(resolve => {
      this.http.get(url, {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .subscribe(data => {
          resolve(data);
          this.message.dismissLoading();
        }, err => {
          this.message.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
          this.message.dismissLoading();
          console.log(err);
        });
    });
  }

}

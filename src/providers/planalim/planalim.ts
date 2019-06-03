import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';

import {ALTYLYA_API} from '../../interfaces/app-options';
import {UserData} from "../user-data";
import {MessagerServiceProvider} from "../messager-service";
/*
  Generated class for the PlanalimProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlanalimProvider {

  alimentsType:Array<string> = ['','Démarrage','Croissance','Finition','Gavage'];
  alimentTypesymbol:Array<string> = ['','demarrage','croissance','finition','gavage'];

  constructor(public http: HttpClient,
              private user:UserData,
              private message : MessagerServiceProvider) {
    console.log('Hello PlanalimProvider Provider');
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
   * dispatch des livraisons en fonction du type d'aliment
   * @param livraisons
   * @param lot
   */
  dispatchLivraisons(livraisons : any, lot : any) {
    let dispatch = {
      demarrage: {quantite:0,prix:0,paranimal:0},
      croissance:{quantite:0,prix:0,paranimal:0},
      finition:{quantite:0,prix:0,paranimal:0},
      gavage:{quantite:0,prix:0,paranimal:0},
      coutparanimal:0
    };

    let i=0;
    let qttetotale = 0;

    // calcul des quantité / type d'aliment
    for (i=0; i<livraisons.length; i++) {
      if(livraisons[i]['aliment_type'] == 1) {
        dispatch.demarrage.quantite += livraisons[i]['quantite'];
        if(livraisons[i]['prix'])
          dispatch.demarrage.prix     += livraisons[i]['quantite']*livraisons[i]['prix'];
      }

      if(livraisons[i]['aliment_type'] == 2) {
        dispatch.croissance.quantite += livraisons[i]['quantite'];
        if(livraisons[i]['prix'])
          dispatch.croissance.prix     += livraisons[i]['quantite']*livraisons[i]['prix'];
      }

      if(livraisons[i]['aliment_type'] == 3) {
        dispatch.finition.quantite += livraisons[i]['quantite'];
        if(livraisons[i]['prix'])
          dispatch.finition.prix     += livraisons[i]['quantite']*livraisons[i]['prix'];
      }

      if(livraisons[i]['aliment_type'] == 4) {
        dispatch.gavage.quantite += livraisons[i]['quantite'];
        if(livraisons[i]['prix'])
          dispatch.gavage.prix     += livraisons[i]['quantite']*livraisons[i]['prix'];
      }
    }

    dispatch.demarrage.paranimal = dispatch.demarrage.quantite*1000/lot.nombre;
    dispatch.croissance.paranimal = dispatch.croissance.quantite*1000/lot.nombre;
    dispatch.finition.paranimal = dispatch.finition.quantite*1000/lot.nombre;
    dispatch.gavage.paranimal = dispatch.gavage.quantite*1000/lot.nombre;

    dispatch.coutparanimal = (dispatch.demarrage.prix+dispatch.croissance.prix+dispatch.finition.prix+dispatch.gavage.prix) / lot.nombre;
    return dispatch;
  }
}

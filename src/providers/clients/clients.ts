import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {ALTYLYA_API} from '../../interfaces/app-options';
import {UserData} from "../user-data";
import {MessagerServiceProvider} from "../messager-service";

/*
  Generated class for the EnlevementsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientsProvider {

  constructor(public http: HttpClient,
              private user:UserData,
              private message : MessagerServiceProvider) {
    console.log('Hello ClientsProvider Provider');
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
   * post enlèvement
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
}
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {ALTYLYA_API} from '../../interfaces/app-options';
import {UserData} from "../user-data";
import {MessagerServiceProvider} from "../messager-service";

/*
  Generated class for the FollowersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FollowersProvider {

  constructor(public http: HttpClient,
              private user:UserData,
              private message : MessagerServiceProvider) {
    console.log('Hello FollowersProvider Provider');
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

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { UserData} from './user-data'
import { ALTYLYA_API } from "../interfaces/app-options";
/*
  Generated class for the FollowersDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FollowersDataProvider {
  filter : string = '';
  constructor(public http: HttpClient,
              private user : UserData) {
    console.log('Hello FollowersDataProvider Provider');
  }

  /**
   * demande la liste des followers à l'API
   * @param id
   * @returns {Promise<any>}
   */
  getFollowers(id)  {
    return new Promise((resolve, reject) => {
      this.http.get(ALTYLYA_API.url+ALTYLYA_API.elevage_followers_get, {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id).set('id',id)})
        .subscribe(
          res => { resolve(res);  },
          (err) => { reject(err); }
        );

    });
  }

  /**
   * poste une saisie/modif de follower.
   * @param data
   * @returns {Observable<any>}
   */
  postfollower(data) : Observable<any> {
    if(data.id==0) {
      return this.http.post(ALTYLYA_API.url+ALTYLYA_API.elevage_followers_post, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .map(this.extractData)
        .catch(this.handleError);
    }
    else {
      return this.http.post(ALTYLYA_API.url+ALTYLYA_API.elevage_followers_put, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .map(this.extractData)
        .catch(this.handleError);
    }

  }

  /**
   * Supprime un follower
   * @param id
   * @returns {Observable<any>}
   */
  deleteFollower(id) : Observable<any>  {
    let data : any = {id:"",elevage_id:""};
    data.id=id;
    data.elevage_id = this.user.elevage.id;

    return this.http.post(ALTYLYA_API.url+ALTYLYA_API.elevage_followers_delete, JSON.stringify(data), {
      params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Liste des lots suivis en cours
   * @returns {Promise<any>}
   */
  getFollowedLots(all='1')  {
    return new Promise((resolve, reject) => {
      this.http.get(ALTYLYA_API.url+ALTYLYA_API.followed_getlots, {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id).set('filter',this.filter).set('all', all)})
        .subscribe(
          res => { resolve(res);  },
          (err) => { reject(err); }
        );

    });
  }

  getFollowedMortalite(id, parc) {
    let data : any = {id:"", parc:1};
    data.id=id;
    data.parc = parc;

    return new Promise((resolve, reject) => {
      this.http.post(ALTYLYA_API.url+ALTYLYA_API.followed_mortalite, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .subscribe(
          res => { resolve(res);  },
          (err) => { reject(err); }
        );
    });
  }

  getFollowedCroissance(id, parc) {
    let data : any = {id:"", parc:1};
    data.id=id;
    data.parc = parc;

    return new Promise((resolve, reject) => {
      this.http.post(ALTYLYA_API.url+ALTYLYA_API.followed_croissance, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .subscribe(
          res => { resolve(res);  },
          (err) => { reject(err); }
        );
    });
  }

  /**
   *
   * @param res
   */
  private extractData(res: Response) {
    return res ;
  }

  /**
   *
   * @param {Response | any} error
   * @returns {string}
   */
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return errMsg;
  }

  /**
   * Supprime un elevage suivi
   * @param id
   * @returns {Observable<any>}
   */
  deleteFollowedElevage(id) : Observable<any>  {
    let data : any = {id:""};
    data.id=id;

    return this.http.get(ALTYLYA_API.url+ALTYLYA_API.elevage_followers_delete, {
      params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
      .map(this.extractData)
      .catch(this.handleError);
  }

}

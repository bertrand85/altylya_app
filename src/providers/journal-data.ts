import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

//import {myElevageJson, Elevage} from "../interfaces/avi_jsons";
import { UserData} from './user-data'
import { ALTYLYA_API } from "../interfaces/app-options";

/*
  Generated class for the JournalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JournalDataProvider {

  constructor(public http: HttpClient,
              private user : UserData) {
    console.log('Hello JournalDataProvider Provider');
  }

  /**
   * demande le journal du lot à l'API
   * @param id
   * @returns {Promise<any>}
   */
  async getJournal(id)  {
    return new Promise((resolve, reject) => {
     this.http.get(ALTYLYA_API.url+ALTYLYA_API.lot_journal_get, {
      params: new HttpParams().set('session_id', this.user.userInfo.session_id).set('id',id)})
       .subscribe(
       res => { resolve(res);  },
       (err) => { reject(err); }
     );

    });
  }

  /**
   * poste une saisie de journal. une saisie = un jour
   * @param data
   * @returns {Observable<any>}
   */
  postJournal(data) : Observable<any> {
    if(data.id==0) {
      return this.http.post(ALTYLYA_API.url+ALTYLYA_API.lot_journal_post, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .map(this.extractData)
        .catch(this.handleError);
    }
    else {
      return this.http.post(ALTYLYA_API.url+ALTYLYA_API.lot_journal_put, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .map(this.extractData)
        .catch(this.handleError);
    }

  }

  /**
   *
   * @param res
   */
  private extractData(res: Response) {
    console.log(res);
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

  calc_resultats_lot(journal) {
    let resultats = [];
    let mortalite = 0, pesee=0, aliment=0, indicec=0;
    for(var i=0;i<20;i++) {
      let l = {mortalite:0,aliment:0,ic:0};
      resultats.push(i);
    }

    journal.forEach(function(element) {
      mortalite += parseInt(element.mort_matin)+parseInt(element.mort_soir);
      aliment += parseInt(element.aliment);
      if(element.poids>pesee)
        pesee = parseInt(element.poids);

    })

    let resultat = {mortalite : mortalite, aliment:aliment, poids : pesee};
    return resultat;
  }


}

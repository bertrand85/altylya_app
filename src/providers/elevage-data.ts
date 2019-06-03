
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

//import {myElevageJson, Elevage} from "../interfaces/avi_jsons";
import { UserData} from './user-data'
import { ALTYLYA_API } from "../interfaces/app-options";

/*
  Generated class for the ElevageDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ElevageDataProvider {

  data: string;

  constructor(public http: HttpClient, private user:UserData) {
    console.log('Hello ElevageDataProvider Provider');
  }


  postElevage(data) : Observable<any> {
    if(data.id==0) {
      return this.http.post(ALTYLYA_API.url+ALTYLYA_API.elevage_own_post, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .map(this.extractData)
        .catch(this.handleError);
    }
    else {
      return this.http.post(ALTYLYA_API.url+ALTYLYA_API.elevage_own_put, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .map(this.extractData)
        .catch(this.handleError);
    }

  }

  postBatiment(data) : Observable<any> {
    if(data.id==0) {
      data.elevage_id = this.user.elevage.id;
      return this.http.post(ALTYLYA_API.url+ALTYLYA_API.batiment_post, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .map(this.extractData)
        .catch(this.handleError);
    }
    else {
      return this.http.post(ALTYLYA_API.url+ALTYLYA_API.batiment_put, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .map(this.extractData)
        .catch(this.handleError);
    }

  }

  deleteBatiment(id) : Observable<any>  {
    let data : any = {id:"",elevage_id:""};
    data.id=id;
    data.elevage_id = this.user.elevage.id;

    return this.http.post(ALTYLYA_API.url+ALTYLYA_API.batiment_delete, JSON.stringify(data), {
      params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res ;
  }

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


}

import { HttpClient , HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { ALTYLYA_API } from "../../interfaces/app-options";
import { UserData } from '../../providers/user-data';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient, private user:UserData) {
    console.log('Hello AuthProvider Provider');
  }

  login(username:string, password:string): Observable<any> {

    let credentials :any = {
      "username": username,
        "password": password
    }
    return this.http.post(ALTYLYA_API.url+ALTYLYA_API.user_login, credentials)
      .map(this.extractData)
      .catch(this.handleError);
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.http.get(ALTYLYA_API.url+ALTYLYA_API.user_logout, {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id)})
        .subscribe(
          res => { resolve(res);  },
          (err) => { reject(err); }
        );

    });
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
    return Observable.throw(errMsg);
  }

}

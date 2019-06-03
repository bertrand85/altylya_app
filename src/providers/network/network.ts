import {HttpClient/*, HttpHeaders*/, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import {ALTYLYA_API} from "../../interfaces/app-options";
import {MessagerServiceProvider} from "../messager-service";
import {UserData} from "../user-data";

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {
  isConnected : boolean=false;
  connectSubscription : any;

  constructor(public http: HttpClient,
              private network:Network,
              private user: UserData,
              private message: MessagerServiceProvider) {
    console.log('Hello NetworkProvider Provider');
  }

  /**
   * init la surveillance du réseau
   */
  init() {
    console.log('init NetworkProvider Provider');
    this.network.onConnect().subscribe(data => {
      this.isConnected = true;
      console.log('connected');
    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {
      this.isConnected=false;
      console.log('disconnect');
    }, error => console.error(error));

    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
  }

  /**
   * requête get
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
   * requete post
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
   * requête delete
   * @param service
   * @returns {Promise<any>}
   */
  delete(service) {
    let url = ALTYLYA_API.urlapi2+service;
    console.log (url);
    this.message.presentLoadingCustom('Chargement...');
    return new Promise(resolve => {
      this.http.delete(url, {
        params: new HttpParams().set('session_id', this.user.userInfo.session_id),
        headers : {"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"} })
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

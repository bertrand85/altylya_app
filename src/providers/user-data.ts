import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ALTYLYA_API, ALTYLYA_USERTYPE } from "../interfaces/app-options";
import { UserProfile } from '../interfaces/user-options';
import {lotInterface} from "../interfaces/lots";
import {MessagerServiceProvider} from "./messager-service";

@Injectable()
export class UserData {
  userInfo  = {username:'',password:'', session_id:'', id:'', usertype:1};
  isLogged :boolean = false;
  isEleveur : boolean = false;
  isAdmin : boolean = false;
  isInitialize : boolean = false;
  justAddLot : any = -1;
  userProfile : UserProfile = {username: "",
                password: "",
                email: "",
                name: "",
                avatar:"",
                mobile_phone:"",
                work_phone:"",
                usertype:"2"};

  hasElevage = false;
  elevage : any;
  elevageModel = {
    id: "0",
    name: "",
    numnational: "",
    streetone: "",
    streettwo: "",
    zipcode: "",
    city: "",
    lat: "",
    long: "",
    avatar: "",
    mobile_phone: "",
    work_phone: ""
  };

  batiments = [];
  batimentListe = [];
  lots : lotInterface[];

  lotSaisieRef: {
    especes:{},
    accouvoirs:{},
    destinations:{},
    souches:{},
    groupements:{},
  };

  constructor(
    public events: Events,
    public storage: Storage,
    public http: HttpClient,

    private message : MessagerServiceProvider ) {
     this.elevage = this.elevageModel;
  }

 setUserInfos(): void {
    this.storage.set('userinfos', this.userInfo);
  }

  getUserInfos(): Promise<any> {
    return this.storage.get('userinfos').then((value) => {
      return value;
    });
  }

  getUserStatus() {
    return new Promise((resolve, reject) => {
      this.http.get(ALTYLYA_API.url+ALTYLYA_API.user_status_get, {
        params: new HttpParams().set('session_id', this.userInfo.session_id)})
        .subscribe(
          res => { resolve(res);  },
          (err) => { reject(err); }
          );

    });

  }

  getSaisieReferences() {
    return new Promise((resolve, reject) => {
      this.http.get(ALTYLYA_API.url+ALTYLYA_API.user_saisieref_get, {
        params: new HttpParams().set('session_id', this.userInfo.session_id)})
        .subscribe(
          res => { resolve(res);  },
          (err) => { reject(err); }
        );

    });

  }


  redirectToUserHomepage() {
    if(this.isEleveur) {
      if(this.hasElevage)
        return 'MydashboardPage';
      else
        return 'MyelevagePage';
    }
     else
      return 'SharingwithmePage';
  }

  updateStatusFromWeb() {
    return new Promise(resolve => {
      this.getUserStatus().then((result) => {
        // reponse 200 depuis l'API

          this.dispatchStatusDatas(result);
          /*if(this.justAddLot!=-1) {
              let index = -1;
              for(let i=0; i<this.lots.length; i++) {
                if(this.lots[i].definition.id==this.justAddLot)
                  index = i;
              }
              if (index>=0)
                this.navCtrl.push('LotplanalimPage', {lot:this.lots[index]});
              this.justAddLot = -1;
            }*/
        resolve(true);
      }, (err) => {
        alert('erreur appel API');
        resolve(false);
      });

    });

  }

  dispatchStatusDatas(statusDatas) {

      if (statusDatas.status == 'ok') {
        this.isLogged = true;

        // update profil infos
        if (statusDatas.profile) {
          this.userProfile = statusDatas.profile;
          this.userInfo.usertype = statusDatas.profile.usertype;
          this.isAdmin = statusDatas.isAdmin;
          this.setUserInfos();
          if (statusDatas.profile.usertype == ALTYLYA_USERTYPE.eleveur)
            this.isEleveur = true;
          else
            this.isEleveur = false;
        }

        // update elevage datas
        if (statusDatas.elevage) {

          if (statusDatas.elevage.elevage.id) {
            this.elevage = statusDatas.elevage.elevage;
            this.hasElevage = true;
          } else {
            this.hasElevage = false;
          }
          if (statusDatas.elevage.batiments.length > 0) {
            this.batiments = statusDatas.elevage.batiments;
            this.batimentListe = [];
            this.batiments.forEach(bat => {
              this.batimentListe.push({id: bat.id, name: bat.name});
            })

          }
          else
            this.batiments = [];
          if (statusDatas.elevage.lots.length > 0)
            this.lots = statusDatas.elevage.lots;
          else
            this.lots = [];

        } else {
          this.elevage = this.elevageModel;

          this.batiments = [];
          this.lots = [];
          this.hasElevage = false;
        }

        this.getSaisieReferences().then( (result:any) =>{
          this.lotSaisieRef = result.refs;
        });
      }

  }

  signup(data) : Observable<any> {
      return this.http.post(ALTYLYA_API.url+ALTYLYA_API.user_signup, JSON.stringify(data))
        .map(this.extractData)
        .catch(this.handleError);
  }

  onLogout() {
    this.elevage  = this.elevageModel;
    this.isEleveur = false;
    this.hasElevage = false;
    this.batiments = [];
    this.batimentListe = [];
    this.isLogged = false;
    this.lots = [];
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

  postProfil(data) {
    let url = ALTYLYA_API.urlapi2+'/api/user';

    this.message.presentLoadingCustom('Enregistrement...');
    return new Promise(resolve => {
      this.http.post(url, JSON.stringify(data), {
        params: new HttpParams().set('session_id', this.userInfo.session_id)})
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

  getBatimentInfo(id:number, property:string) {
    for(let i=0; i<this.batimentListe.length; i++) {
      if(this.batimentListe[i].id==id)
        return this.batimentListe[i][property];
    }
  }

  getBatimentFullInfo(id:number, property:string) {
    for(let i=0; i<this.batiments.length; i++) {
      if(this.batiments[i].id==id)
        return this.batiments[i][property];
    }
  }

  getLotInfo(id:number, property:string) {
    for(let i=0; i<this.lots.length; i++) {
      if(this.lots[i].definition.id==id)
        return this.lots[i].definition[property];
    }
  }
}

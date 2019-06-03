import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EntryPage } from "../pages/entry/entry";

import { UserData } from '../providers/user-data';
import { AuthProvider } from '../providers/auth/auth'
import { MessagerServiceProvider } from '../providers/messager-service';
import { ALTYLYA_API } from "../interfaces/app-options";
//import {MyprofilPage} from "../pages/myprofil/myprofil";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  errorMessage: string;
  rootPage: any = EntryPage;
  imgurl : string ;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private User : UserData,
              private Auth : AuthProvider,
              private Messager : MessagerServiceProvider) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mon élevage', component: 'MyelevagePage' },
      { title: 'Login', component: 'LoginPage' },
      { title: 'Signup', component: 'SignupPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.imgurl = ALTYLYA_API.imgurl;
      // test si on connait l'utilisateur, si on le connait avec un numeror de session
      // demande son status à l'API
      // si status = ko, tente de le relogguer
      //alert(this.imgurl);
      this.User.getUserInfos().then((value) => {

        if (value)
          this.User.userInfo=value;

        if(this.User.userInfo.session_id!='') {
          // un numero de session est enregistré sur l'appareil
          // on regarde coté serveur si on est toujours connecté
          this.User.getUserStatus().then((result) => {
            // reponse 200 depuis l'API
            this.afterGetStatus(result);
            this.afterInitialize();
          }, (err) => {
            alert('erreur appel API');
            this.afterInitialize();
          });

        } else {
          this.nav.setRoot(EntryPage);
          this.User.isInitialize = true;
          this.afterInitialize();

        }
      });


    })
  }

  afterInitialize() {
    this.splashScreen.hide();

  }

  afterGetStatus(res) {

    if(res.status=='ok') {
      //status ok=connecté
      // on implémente les user data avec le profil, elevage...
      this.User.dispatchStatusDatas(res);
      this.User.isInitialize = true;
      this.nav.setRoot(this.User.redirectToUserHomepage());

    } else {
      // status ko=non connecté, on va vers la page principale
      this.User.isInitialize = true;
      this.nav.setRoot(EntryPage);
     }
  }

  logout() {
    this.Auth.logout().then((value:any)=>{
      let res = value;
      if(res.status=='ok') {
        this.User.onLogout();
        this.nav.setRoot(EntryPage).then((value)=>{window.location.reload();});
      } else {
        this.Messager.showAlert(res.error_description, 'Erreur!');
        this.User.isLogged = false;
      }
    })
  }
 /* afterTryLogin(loginRes) {
    if(loginRes.status == 'ok') {
      this.User.afterLogin(loginRes);
      if(this.User.userInfo.usertype==1)
        this.nav.setRoot('MydashboardPage');
      else
        this.nav.setRoot('SharingwithmePage');
    }
    else {
      this.nav.setRoot('EntryPage');
    }
    this.afterInitialize();
  }*/

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.nav.setRoot(page);
  }

  editProfil() {
    this.nav.setRoot('MyprofilPage');
  }
}

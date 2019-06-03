import { BrowserModule } from '@angular/platform-browser';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';

import { FileOpener } from '@ionic-native/file-opener';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { CalendarModule } from "ion2-calendar";
import { MyApp } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from '../components/components.module'
import { PipesModule } from '../pipes/pipes.module';
// pages
import { EntryPage } from "../pages/entry/entry";

// interfaces
import { UserData } from '../providers/user-data';
import { ElevageDataProvider } from '../providers/elevage-data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { NetworkProvider } from '../providers/network/network';
import { MessagerServiceProvider } from '../providers/messager-service';
import { LotDataProvider } from '../providers/lot-data';
import { JournalDataProvider } from '../providers/journal-data';
import { FollowersDataProvider } from '../providers/followers-data';
import { EnlevementsProvider } from '../providers/enlevements/enlevements';
import { EnlevementProvider } from '../providers/enlevement/enlevement';
import { PlanalimProvider } from '../providers/planalim/planalim';
import { ClientsProvider } from "../providers/clients/clients";
import { FollowersProvider } from '../providers/followers/followers';
import { UserproviderProvider } from '../providers/userprovider/userprovider';
import { ProductionplanProvider } from '../providers/lots/productionplan';
import { MargebrutProvider } from '../providers/margebrut/margebrut';
/*import {MyelevagePage} from "../../../../projets/ionic/altylya/src/pages/myelevage/myelevage";
import {BatimentPage} from "../../../../projets/ionic/altylya/src/pages/batiment/batiment";*/

@NgModule({
  declarations: [
    MyApp,
    EntryPage,
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    HttpClientModule,
    ChartsModule,
    ComponentsModule,
    PipesModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntryPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserData,
    ElevageDataProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    Crop,
    Camera,
    File,
    Transfer,
    FilePath,
    AuthProvider,
    Network,
    NetworkProvider,

    FileOpener,
    MessagerServiceProvider,
    LotDataProvider,
    JournalDataProvider,
    FollowersDataProvider,
    EnlevementsProvider,
    EnlevementProvider,
    PlanalimProvider,
    ClientsProvider,
    FollowersProvider,

    UserproviderProvider,
    ProductionplanProvider,
    MargebrutProvider,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class AppModule {}

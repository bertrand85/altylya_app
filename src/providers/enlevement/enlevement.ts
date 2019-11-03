import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserData} from "../user-data";
import {NetworkProvider} from "../network/network";
import {MessagerServiceProvider} from "../messager-service";

export interface identite {
  nameExploi: string,
  nameEleveur: string,
  telExploi: string,
  faxExploi: string,
  adresse: string,
  numExploi: string,
  nameOP: string,
  adresseOP: string,
  telOP: string,
  faxOP: string,
  nameTechn: string,
  telTechn: string,
  nameVeto: string,
  telVeto: string,
  faxVeto: string,
}

export interface bande {
  lotId :number,
  lotCode : string,
  souche : string,
  couvoir : string,
  batimentINUAV : string,
  communeBatiment : string,
  productionType : string,
  productionTypeAutre : string,
  nbMisEnPlace : number,
  dateMiseEnPlace : string,
  ageMiseEnPlace : number,
  densite : number,
}

export interface etatSanitaire {
  pdsVif15j : number,
  pdsVif8j : number,
  pdsVifAbattage : number,
  mortTotalNb : number,
  mortTotalPourcent : number,
  mort10jNb : number,
  mort10Pourcent : number,
  mortLast15Nb : number,
  mortLast15Pourcent : number,
  observations : string,
  salmoAnalyse : boolean,
  salmoDatePrelev : string,
  salmoEleDerog : boolean,
  derogEnlevContinu : boolean,
  derogToutPleinVide : boolean,
  salmoLabo : string,
  salmoResultat : string,
  salmoSerotype : string,
}

export interface enlevement {
  date : string,
  nombre : number,
  observations : string,
}

export interface enlevements {
  enlevementMultiple : boolean,
  items : Array<enlevement>,
}

export interface alimentsupplemente {
  name : string,
  dateDebut : string,
  dateFin : string,
  tempsAttente : number,
  veterinaire : string,
  ordonnance : string,
}

export interface alimentsSupplementes {
  items : Array<alimentsupplemente>,
}

export interface traitement {
  pathologie : string,
  traitement : string,
  dateDebut : string,
  dateFin : string,
  tempsAttente : number,
  ordonnance : string,
}

export interface icaData {
  id : number,
  lot_id : number,
  enlevement_id : number,
  ica : {
    identite : identite,
    bande : bande,
    etatSanitaire : etatSanitaire,
    enlevements: enlevements,
    aliment : alimentsSupplementes,
    traitements : traitements,
  },
  status : number,
}

export interface traitements {
  examEnCours : '',
  examLabo:'';
  items : Array<traitement>,
}

export interface elevageEntity {
  nameExploi : string,
  nameEleveur : string,
  telExploi : string,
  faxExploi : string,
  adresse   : string,
  numExploi : string,
  nameOP : string,
  adresseOP : string,
  telOP : string,
  faxOP : string,
  nameTechn : string,
  telTechn : string,
  nameVeto : string,
  telVeto : string,
  faxVeto : string,
}

export interface enlevementEntity {
  id:number,
  date : string,
  nombre : number,
  poids_total : number,
}

export interface lotIcaGeneralEntity {
  lotId : string,
  lotCode : string,
  souche : string,
  couvoir : string,
  batimentINUAV : string,
  communeBatiment : string,
  productionType : string,
  nbMisEnPlace : number,
  dateMiseEnPlace : string,
  ageMiseEnPlace : number,
  densite : number,
  pdsVif15j : number,
  pdsVif8j  : number,
  pdsVifAbattage : number,
  mortTotalNb : number,
  mortTotalPourcent : number,
  mort10jNb : number,
  mort10Pourcent : number,
  mortLast15Nb : number,
  mortLast15Pourcent : number,
  enlevementMultiple : string,
}

export interface alimEntity {
  name : string,
  dateDebut : string,
  dateFin : string,
  tempsAttente : number,
  veterinaire : string,
  ordonnance : string
}

export interface progAlimEntity {
  fournisseur : string,
  liste : Array<alimEntity>
}

export let ICABlocks = {
  gallus : [
    {min: 0,   max: 18,  block: "elevage"},
    {min: 18.1,  max: 28,  block: "bande"},
    {min: 28.1,  max: 43,  block: "aliment"},
    {min: 43.1,  max: 69, block: "sanitaire"},
    {min: 69.1, max: 82, block: "pathologie"},
    {min: 82.1, max: 90, block: "enlevement"},
    {min: 90.1, max: 100, block: "signature"}
  ]

}
/*
  Generated class for the EnlevementProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnlevementProvider {

  elevage : elevageEntity;
  current : enlevementEntity;
  currentLot : lotIcaGeneralEntity;
  progAlim : progAlimEntity = {'fournisseur':'', 'liste':[]};
  enlevements : any = [];
  icaBlocks = ICABlocks;

  lot : any;

  icadata : icaData;
  icaimg : string;
  icaimgbaseurl = 'https://api060.altylya.com/images/ica/';
  src = '';

  constructor(private user : UserData,
              private network : NetworkProvider,
              private Messager :MessagerServiceProvider) {
    console.log('Hello EnlevementProvider Provider');
  }


  /**
   * init la fiche ICA avec ce qu'il y a en BDD
   * @param lot
   * @param enlevId
   * @returns {Promise<void>}
   */
  async initLotIca(lot : any, enlevId : any) {
    this.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    let ica : any;
    const t = await this.network.get('api/lot/'+lot+'/icapdf/'+enlevId).then(data => {
      if(data['result'] == 'ok') {
        let datas = data['datas']
        this.icadata = datas['ica'];
        this.icaimg = datas['img'];
        this.src = this.icaimg;
      }
      else {
        this.Messager.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
      }

    });
    this.lot = lot;


  }

  /**
   *
   * @param lot
   */
  save(lot:any) {
    let service = 'api/lot/'+lot.definition.id+'/ica';
    this.network.post(service, this.icadata).then(data=>{
      if(data['result'] == 'ok') {
        this.Messager.TaostMessage('Fiche ICA enregistrée');
      }
      else {
        this.Messager.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
      }
    })
  }

  /**
   * get blockname by y position in image  page
   * @param {string} icatype
   * @param {number} ypos
   * @returns {string}
   */
  getBlock( icatype: string, ypos : number )  {
    return new Promise( resolve => {
      let icaBlock = this.icaBlocks[icatype];
      let block = '';
      for( let i=0; i<icaBlock.length; i++) {
        if( ypos>=icaBlock[i].min && ypos<=icaBlock[i].max ) {
          block = icaBlock[i].block ;
        }
      }
      resolve ( block );
    });

  }

  /**
   *
   * @param {string} blockName
   * @param data
   */
  saveBlockData(blockName : string, data : any)  {

    let dataToSend = {id: this.icadata.id, blockName : blockName, data : data};
    let service = 'api/lot/'+this.icadata.lot_id+'/icapdfblock';
    return this.network.post(service, dataToSend).then(data=>{
      if(data['result'] == 'ok') {
        let datas = data['datas']
        this.icadata = datas['ica'];
        this.icaimg = datas['img'];
        this.src = this.icaimg;
        this.Messager.TaostMessage('Fiche ICA, block enregistrée');
      }
      else {
        this.Messager.showAlert('Erreur lors de l\'appel du service, réessayer plus tard','Erreur API');
      }
    })
  }

  /**
   * ajoute un aliment supplémenté
   * @constructor
   */
  addAlimentSupplemente () {
    const newAlim : alimentsupplemente = {name:'', dateDebut:'',dateFin:'',veterinaire:'',ordonnance:'',tempsAttente:8};

    this.icadata.ica.aliment.items.push(newAlim);
  }

  deleteAlimentSupplemente (index : number) {

    this.icadata.ica.aliment.items.splice(index,1);
  }

  /**
   * ajoute un traitement
   * @constructor
   */
  addTraitement () {
    const newTraitement : traitement = {pathologie:'', dateDebut:'',dateFin:'',traitement:'',ordonnance:'',tempsAttente:8};

    this.icadata.ica.traitements.items.push(newTraitement);
  }

  deleteTraitement (index : number) {

    this.icadata.ica.traitements.items.splice(index,1);
  }


}

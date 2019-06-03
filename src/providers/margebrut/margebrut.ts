import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {marge, margeItem} from '../../interfaces/lots';
import {UserData} from "../user-data";
import {NetworkProvider} from "../network/network";

/*
  Generated class for the MargebrutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MargebrutProvider {

  lot_id : number;
  lot_id_encode : string;

  marge : marge;

  constructor(public http: HttpClient,
  				    private storage : Storage,
              private networkProvider : NetworkProvider,
              private user : UserData) {

  }

  /**
  * retrieve record from database or local
  * @var
  *
  */
  getMargeBrut(lot_id : number) {
    this.lot_id = lot_id;
    this.lot_id_encode = 'mblot_' + this.lot_id.toString();

    // get marge from local storage or create new
    this.storage.get(this.lot_id_encode).then((result) => {
      if(result) {
        this.marge = result;
      }
      else {
        this.marge = this.getNewMarge();
      }
      this.getEnlevements();
      this.getAliments();
      this.getPoussins();
    });
  }

  /**
  * store record in database and local
  * @var
  *
  */
  storeMargeBrut() {
    this.calculMarge();
 	  this.storage.set(this.lot_id_encode , this.marge);
 }

  /**
   * create margeBrute
   * @returns {marge}
   */
   getNewMarge() {
      let newmarge: marge;
      newmarge = {lot_id : this.lot_id, id:0, produits:[], charges:[], total_produits:0, total_charges:0, marge:0, marge_mcarre:0, marge_pa:0};
      return newmarge;
   }

  /**
   * create new  marge item
   * @returns {margeItem}
   */
   getNewItem() {
      let newItem : margeItem = { ref:'',label:'Cliquer ...', value:0, unitvalue:'', quantity:0, comment:''};

      return newItem;
   }

  /**
   * ajoute un produit
   */
   addProduit() {
     this.marge.produits.push(this.getNewItem());
   }

  /**
   * Ajoute une charge
   */
  addCharge() {
    this.marge.charges.push(this.getNewItem());
  }

  deleteProduit(i:number) {
    this.marge.produits.splice(i,1);
  }

  deleteCharge(i:number) {
    this.marge.charges.splice(i,1);
  }

  /**
   * calcul de la marge
   */
  calculMarge() {
    this.marge.total_produits = 0;
    this.marge.total_charges  = 0;

    for(let i=0; i<this.marge.produits.length; i++) {
      let item = this.marge.produits[i];
      this.marge.total_produits += item.value*item.quantity;
    }

    //calcul des charges
    for(let i=0; i<this.marge.charges.length; i++) {
      let item = this.marge.charges[i];
      this.marge.total_charges += item.value*item.quantity;
    }

    this.marge.marge = this.marge.total_produits - this.marge.total_charges;

    // marge /m2
    const batiment = this.user.getLotInfo(this.lot_id, "batiment_id");
    const surface = this.user.getBatimentFullInfo(batiment, "surface");

    this.marge.marge_mcarre = this.marge.marge / parseInt(surface);
    this.marge.marge_mcarre = parseFloat(this.marge.marge_mcarre.toFixed(2));
  }

  /**
   * Get lot enlevements for update produit
   *
   */
  getEnlevements() {
    let planurl = '/api/lot/' + this.lot_id + '/enlevements';
    this.networkProvider.get(planurl)
      .then(data => {
        if (data['result'] == 'ok') {
          // data['datas'] contient les enlevements
          let enlevements = data['datas'];
          let ref = '', find = false;
          for( let i = 0; i < enlevements.length; i++) {
            ref = 'enlev-' + enlevements[i].id;
            find = false;
            for( let j = 0; j < this.marge.produits.length; j++) {
              if(this.marge.produits[j].ref == ref ) {
                find = true;
              }
            }
            // enlevement non trouvé dans la liste des produits, on l'ajoute
            if( find==false ) {
              let newItem : margeItem = { ref: ref, label:'Enlèv. du ' + enlevements[i].date,
                value: 0, unitvalue:'', quantity: enlevements[i].nombre, comment:''};
              this.marge.produits.push( newItem );
            }

          }

          this.storeMargeBrut();
        }

      });
  }

  /**
   * update livraisons d'aliments
   */
  getAliments() {
    let planurl = '/api/lot/' + this.lot_id + '/alimlivraisons';
    this.networkProvider.get(planurl)
      .then(data => {
        if (data['result'] == 'ok') {
          // data['datas'] contient les livraisons d'aliments
          let aliments = data['datas'];
          let ref = '', find = false;
          for( let i = 0; i < aliments.length; i++) {
            ref = 'alim-' + aliments[i].id;
            find = false;
            for( let j = 0; j < this.marge.charges.length; j++) {
              if(this.marge.charges[j].ref == ref ) {
                find = true;
              }
            }
            // aliment non trouvé dans la liste des charges, on l'ajoute
            if( find==false ) {
              let newItem : margeItem = { ref: ref, label:'aliment du ' + aliments[i].date,
                value: aliments[i].prix, unitvalue: '', quantity: aliments[i].quantite, comment:''};
              this.marge.charges.push( newItem );
            }

          }

          this.storeMargeBrut();
        }

      });
  }


  getPoussins() {
    let nbEntre = this.user.getLotInfo( this.lot_id, 'nombre');
    let ref = 'mep-' + this.lot_id;
    let find = false;
    for( let j = 0; j < this.marge.charges.length; j++) {
      if(this.marge.charges[j].ref == ref ) {
        find = true;
      }
    }
    // MEP non trouvé dans la liste des charges, on l'ajoute
    if( find==false ) {
      let newItem : margeItem = { ref: ref, label:'MEP du ' + this.user.getLotInfo( this.lot_id, 'date_entree'),
        value: 0, unitvalue: '', quantity: nbEntre, comment:''};
      this.marge.charges.push( newItem );
    }
  }

}

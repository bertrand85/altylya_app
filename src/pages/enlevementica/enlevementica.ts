import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import {enlevementEntity, EnlevementProvider} from "../../providers/enlevement/enlevement";

/**
 * Generated class for the EnlevementicaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enlevementica',
  templateUrl: 'enlevementica.html',
})
export class EnlevementicaPage {
  //@ViewChild('enlevementSlider') enlevementSlider: any;
  slidesStates : Array<any>;
  activeSlide : number = 0;
  slidesForms : Array<FormGroup> = [];

  slideElevage:FormGroup;
  slideTechn:FormGroup;
  slideVeto : FormGroup;
  slideBande : FormGroup;
  slideBandeTwo : FormGroup;
  slideAliments : FormGroup;
  slideEtatSanitaire: FormGroup;
  slideSalmonelle: FormGroup;
  slidePathologie : FormGroup;
  slideEnlevements : FormGroup;
  slideSave : FormGroup;

  submitAttempt: boolean = false;

  lot : any;
  enlevId : any = 0;
  ready = false;
  constructor(private view: ViewController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private enlevementProvider : EnlevementProvider) {
    if(this.navParams.data.data.lot!=undefined)
      this.lot = Object.assign({}, this.navParams.data.data.lot);
    if(this.navParams.data.data.enlevId!=undefined)
      this.enlevId = this.navParams.data.data.enlevId;
    const a = this.init(this.lot);
    this.slidesStates = [true, false, false,false,false,false,false,false,false,false,false,false];



  }


  async init(lot:any) {
  await this.enlevementProvider.initLotIca(this.lot, this.enlevId).then(r=>{
    this.slideElevage = this.formBuilder.group({
      nameExploi: [ this.enlevementProvider.icadata.ica.identite.nameExploi, Validators.required],
      nameEleveur: [ this.enlevementProvider.icadata.ica.identite.nameEleveur, Validators.required],
      telExploi: [ this.enlevementProvider.icadata.ica.identite.telExploi, Validators.required],
      faxExploi: [ this.enlevementProvider.icadata.ica.identite.faxExploi],
      adresse: [ this.enlevementProvider.icadata.ica.identite.adresse, Validators.required],
      numExploi: [ this.enlevementProvider.icadata.ica.identite.numExploi],

    });

    this.slidesForms.push(this.slideElevage);

    this.slideTechn = this.formBuilder.group({
      nameOP: [this.enlevementProvider.icadata.ica.identite.nameOP],
      adresseOP: [this.enlevementProvider.icadata.ica.identite.adresseOP],
      telOP: [this.enlevementProvider.icadata.ica.identite.telOP],
      faxOP: [this.enlevementProvider.icadata.ica.identite.faxOP],
      nameTechn: [this.enlevementProvider.icadata.ica.identite.nameTechn],
      telTechn: [this.enlevementProvider.icadata.ica.identite.telTechn],
    });
    this.slidesForms.push(this.slideTechn);

    this.slideVeto = this.formBuilder.group({
      nameVeto: [this.enlevementProvider.icadata.ica.identite.nameVeto],
      telVeto: [this.enlevementProvider.icadata.ica.identite.telVeto],
      faxVeto: [this.enlevementProvider.icadata.ica.identite.faxVeto],
    });
    this.slidesForms.push(this.slideVeto);

    this.slideBande = this.formBuilder.group({
      lotCode: [this.enlevementProvider.icadata.ica.bande.lotCode],
      souche: [this.enlevementProvider.icadata.ica.bande.souche],
      couvoir: [this.enlevementProvider.icadata.ica.bande.couvoir],
      batimentINUAV: [this.enlevementProvider.icadata.ica.bande.batimentINUAV],
      communeBatiment: [this.enlevementProvider.icadata.ica.bande.communeBatiment],
      productionType: [this.enlevementProvider.icadata.ica.bande.productionType],
      productionTypeAutre: [this.enlevementProvider.icadata.ica.bande.productionTypeAutre],
    });
    this.slidesForms.push(this.slideBande);

    this.slideBandeTwo = this.formBuilder.group({
      nbMisEnPlace: [this.enlevementProvider.icadata.ica.bande.nbMisEnPlace],
      dateMiseEnPlace: [this.enlevementProvider.icadata.ica.bande.dateMiseEnPlace],
      ageMiseEnPlace: [this.enlevementProvider.icadata.ica.bande.ageMiseEnPlace],
      densite: [this.enlevementProvider.icadata.ica.bande.densite],
    });
    this.slidesForms.push(this.slideBandeTwo);

    this.slideAliments = this.formBuilder.group({
      nbAlimentsSupp : [0],
    });
    this.slidesForms.push(this.slideAliments);

    // form pour le premier slide
    this.slideEtatSanitaire = this.formBuilder.group({
      pdsVif15j : [this.enlevementProvider.icadata.ica.etatSanitaire.pdsVif15j],
      pdsVif8j : [this.enlevementProvider.icadata.ica.etatSanitaire.pdsVif8j],
      pdsVifAbattage : [this.enlevementProvider.icadata.ica.etatSanitaire.pdsVifAbattage],
      mortTotalNb : [this.enlevementProvider.icadata.ica.etatSanitaire.mortTotalNb],
      mortTotalPourcent : [this.enlevementProvider.icadata.ica.etatSanitaire.mortTotalPourcent],
      mort10jNb : [this.enlevementProvider.icadata.ica.etatSanitaire.mort10jNb],
      mort10Pourcent : [this.enlevementProvider.icadata.ica.etatSanitaire.mort10Pourcent],
      mortLast15Nb : [this.enlevementProvider.icadata.ica.etatSanitaire.mortLast15Nb],
      mortLast15Pourcent : [this.enlevementProvider.icadata.ica.etatSanitaire.mortLast15Pourcent],
      observations : [this.enlevementProvider.icadata.ica.etatSanitaire.observations],
    });

    this.slidesForms.push(this.slideEtatSanitaire);

    // form pour le second slide
    this.slideSalmonelle = this.formBuilder.group({
      salmoAnalyse : [this.enlevementProvider.icadata.ica.etatSanitaire.salmoAnalyse],
      salmoDatePrelev : [this.enlevementProvider.icadata.ica.etatSanitaire.salmoDatePrelev],
      salmoEleDerog : [this.enlevementProvider.icadata.ica.etatSanitaire.salmoEleDerog],
      derogEnlevContinu : [this.enlevementProvider.icadata.ica.etatSanitaire.derogEnlevContinu],
      derogToutPleinVide : [this.enlevementProvider.icadata.ica.etatSanitaire.derogToutPleinVide],
      salmoLabo : [this.enlevementProvider.icadata.ica.etatSanitaire.salmoLabo],
      salmoResultat : [this.enlevementProvider.icadata.ica.etatSanitaire.salmoResultat],
      salmoSerotype : [this.enlevementProvider.icadata.ica.etatSanitaire.salmoSerotype],
    });
    this.slidesForms.push(this.slideSalmonelle);

    this.slidePathologie = this.formBuilder.group({
      examEnCours : [this.enlevementProvider.icadata.ica.traitements.examEnCours],
      examLabo : [this.enlevementProvider.icadata.ica.traitements.examLabo],
    });
    this.slidesForms.push(this.slidePathologie);

    this.slideEnlevements = this.formBuilder.group({
      multiple : [this.enlevementProvider.icadata.ica.enlevements.enlevementMultiple],

    });
    this.slidesForms.push(this.slideEnlevements);

    this.slideSave = this.formBuilder.group({
      genererPDF : [0],

    });
    this.slidesForms.push(this.slideSave);

    this.ready = true;
  });
}

  next(){
    //this.enlevementSlider.slideNext();
    if(this.activeSlide>0) {
      if(!this.slidesForms[this.activeSlide-1].valid) {
        this.submitAttempt = true;
        return false;
      }
    }
    this.submitAttempt = false;
    if(this.activeSlide<this.slidesStates.length-1) {
      this.slidesStates[this.activeSlide] = false;
      this.activeSlide++;
      this.slidesStates[this.activeSlide] = true;

    }
  }

  prev(){
    if(this.activeSlide>0) {
      console.log(this.slidesForms[this.activeSlide-1]);
    }
    //this.enlevementSlider.slidePrev();
    if(this.activeSlide>0) {
      this.slidesStates[this.activeSlide] = false;
      this.activeSlide--;
      this.slidesStates[this.activeSlide] = true;

    }  }



  closeModal() {
    const data = false;
    this.view.dismiss(data);
  }

  afterSave() {
    const data = true;
    this.view.dismiss(data);
  }

  /********************************************************************************************************************
   *
   * operations sur les aliments supplémentés
   */

  addAliment() {
    this.enlevementProvider.addAlimentSupplemente();
  }

  deleteAliment(index : number) {
    this.enlevementProvider.deleteAlimentSupplemente(index);
  }

  /********************************************************************************************************************
   *
   * operations sur les traitements
   */

  addTraitement() {
    this.enlevementProvider.addTraitement();
  }

  deleteTraitement(index : number) {
    this.enlevementProvider.deleteTraitement(index);
  }

  /********************************************************************************************************************
   * traitement du save
   */
  save(){

    console.log(this.enlevementProvider.icadata.ica.aliment);
    this.reportDataToProvider();
    this.enlevementProvider.save(this.lot);
    this.afterSave();
  }

  reportDataToProvider() {
    let values = this.slideElevage.value;
    this.enlevementProvider.icadata.ica.identite.nameExploi = values.nameExploi;
    this.enlevementProvider.icadata.ica.identite.nameEleveur = values.nameEleveur;
    this.enlevementProvider.icadata.ica.identite.telExploi = values.telExploi;
    this.enlevementProvider.icadata.ica.identite.faxExploi = values.faxExploi;
    this.enlevementProvider.icadata.ica.identite.adresse = values.adresse;
    this.enlevementProvider.icadata.ica.identite.numExploi = values.numExploi;

    values = this.slideTechn.value;
    this.enlevementProvider.icadata.ica.identite.nameOP = values.nameOP;
    this.enlevementProvider.icadata.ica.identite.adresseOP = values.adresseOP;
    this.enlevementProvider.icadata.ica.identite.telOP = values.telOP;
    this.enlevementProvider.icadata.ica.identite.faxOP = values.faxOP;
    this.enlevementProvider.icadata.ica.identite.nameTechn = values.nameTechn;
    this.enlevementProvider.icadata.ica.identite.telTechn = values.telTechn;

    values = this.slideVeto.value;
    this.enlevementProvider.icadata.ica.identite.nameVeto = values.nameVeto;
    this.enlevementProvider.icadata.ica.identite.telVeto = values.telVeto;
    this.enlevementProvider.icadata.ica.identite.faxVeto = values.faxVeto;

    values = this.slideBande.value;
    this.enlevementProvider.icadata.ica.bande.lotCode = values.lotCode;
    this.enlevementProvider.icadata.ica.bande.souche = values.souche;
    this.enlevementProvider.icadata.ica.bande.couvoir = values.couvoir;
    this.enlevementProvider.icadata.ica.bande.batimentINUAV = values.batimentINUAV;
    this.enlevementProvider.icadata.ica.bande.communeBatiment = values.communeBatiment;
    this.enlevementProvider.icadata.ica.bande.productionType = values.productionType;
    this.enlevementProvider.icadata.ica.bande.productionTypeAutre = values.productionTypeAutre;

    values = this.slideBandeTwo.value;
    this.enlevementProvider.icadata.ica.bande.nbMisEnPlace = values.nbMisEnPlace;
    this.enlevementProvider.icadata.ica.bande.dateMiseEnPlace = values.dateMiseEnPlace;
    this.enlevementProvider.icadata.ica.bande.ageMiseEnPlace = values.ageMiseEnPlace;
    this.enlevementProvider.icadata.ica.bande.densite = values.densite;

    values = this.slideEtatSanitaire.value;
    this.enlevementProvider.icadata.ica.etatSanitaire.pdsVif15j = values.pdsVif15j;
    this.enlevementProvider.icadata.ica.etatSanitaire.pdsVif8j = values.pdsVif8j;
    this.enlevementProvider.icadata.ica.etatSanitaire.pdsVifAbattage = values.pdsVifAbattage;
    this.enlevementProvider.icadata.ica.etatSanitaire.mortTotalNb = values.mortTotalNb;
    this.enlevementProvider.icadata.ica.etatSanitaire.mortTotalPourcent = values.mortTotalPourcent;
    this.enlevementProvider.icadata.ica.etatSanitaire.mort10jNb = values.mort10jNb;
    this.enlevementProvider.icadata.ica.etatSanitaire.mort10Pourcent = values.mort10Pourcent;
    this.enlevementProvider.icadata.ica.etatSanitaire.mortLast15Nb = values.mortLast15Nb;
    this.enlevementProvider.icadata.ica.etatSanitaire.mortLast15Pourcent = values.mortLast15Pourcent;
    this.enlevementProvider.icadata.ica.etatSanitaire.observations = values.observations;

    values = this.slideSalmonelle.value;
    this.enlevementProvider.icadata.ica.etatSanitaire.salmoAnalyse = values.salmoAnalyse;
    this.enlevementProvider.icadata.ica.etatSanitaire.salmoDatePrelev = values.salmoDatePrelev;
    this.enlevementProvider.icadata.ica.etatSanitaire.salmoEleDerog = values.salmoEleDerog;
    this.enlevementProvider.icadata.ica.etatSanitaire.derogEnlevContinu = values.derogEnlevContinu;
    this.enlevementProvider.icadata.ica.etatSanitaire.derogToutPleinVide = values.derogToutPleinVide;
    this.enlevementProvider.icadata.ica.etatSanitaire.salmoLabo = values.salmoLabo;
    this.enlevementProvider.icadata.ica.etatSanitaire.salmoResultat = values.salmoResultat;
    this.enlevementProvider.icadata.ica.etatSanitaire.salmoSerotype = values.salmoSerotype;

    values = this.slidePathologie.value;
    this.enlevementProvider.icadata.ica.traitements.examEnCours = values.examEnCours;
    this.enlevementProvider.icadata.ica.traitements.examLabo = values.examLabo;

    values = this.slideEnlevements.value;
    this.enlevementProvider.icadata.ica.enlevements.enlevementMultiple = values.multiple;

    //aliments supplémentés
    let el = document.querySelectorAll("input[name='alimname[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevementProvider.icadata.ica.aliment.items[i].name = el[i]['value'];
    }

      el = document.querySelectorAll("input[name='dateDebut[]']");
      for (let i=0; i<el.length; i++) {
        this.enlevementProvider.icadata.ica.aliment.items[i].dateDebut = el[i]['value'];
      }

      el = document.querySelectorAll("input[name='dateFin[]']");
      for (let i=0; i<el.length; i++) {
        this.enlevementProvider.icadata.ica.aliment.items[i].dateFin = el[i]['value'];
      }

      el = document.querySelectorAll("input[name='veterinaire[]']");
      for (let i=0; i<el.length; i++) {
        this.enlevementProvider.icadata.ica.aliment.items[i].veterinaire = el[i]['value'];
      }

    el = document.querySelectorAll("input[name='tempsAttente[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevementProvider.icadata.ica.aliment.items[i].tempsAttente = el[i]['value'];
    }

    el = document.querySelectorAll("input[name='ordonnance[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevementProvider.icadata.ica.aliment.items[i].ordonnance = el[i]['value'];
    }

    // traitements
    el = document.querySelectorAll("input[name='traitePatho[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevementProvider.icadata.ica.traitements.items[i].pathologie = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='traiteDateDebut[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevementProvider.icadata.ica.traitements.items[i].dateDebut = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='traiteDateFin[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevementProvider.icadata.ica.traitements.items[i].dateFin = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='traiteTraitement[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevementProvider.icadata.ica.traitements.items[i].traitement = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='traiteTempsAttente[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevementProvider.icadata.ica.traitements.items[i].tempsAttente = el[i]['value'];
    }
    el = document.querySelectorAll("input[name='TraiteOrdonnance[]']");
    for (let i=0; i<el.length; i++) {
      this.enlevementProvider.icadata.ica.traitements.items[i].ordonnance = el[i]['value'];
    }
    console.log(this.enlevementProvider.icadata.ica);
  }
}

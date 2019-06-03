/* lot datas */

export interface lotInterface {
  definition : lotDefinition,
  instant_datas  : lotInstantDatas,
  journal        : lotJournal[],
  other          : any;
}

export interface lotDefinition {
  id             : number,
  elevage_id     : number,
  batiment_id    : number,
  name           : string,
  nombre         : number,
  nombre_p2      : number,
  accouvoir_id   : number ,
  date_entree    : string,
  espece_id      : number,
  destination_id : number,
  sexe           : number,
  groupement_id  : number,
  souche_id      : number,
  status         : number,
}

export interface lotInstantDatas {
  age_j          : number,
  age_s          : number,
  mort           : number,
  aliment        : number,
  txmortalite    : number,
  poids          : number,
  indiceconso    : number,
  poidsmax       : number,
  poidsmin       : number,
  icobjectifmin  : number,
  icobjectifmax  : number,
}

export interface lotTraitement {
  symptome       : string,
  produit        : string,
  qtte_produit   : string,
  ordonnance     : string,
  mode           : string
}

export interface lotDailyData {
  id             : number,
  lot_id         : number,
  date           : string,
  day            : number,
  mort_matin     : number,
  mort_midi      : number,
  mort_soir      : number,
  mort_matin_p2  : number,
  mort_midi_p2   : number,
  mort_soir_p2   : number,
  poids          : number,
  poids_p2       : number,
  aliment        : number,
  aliment_stock  : number,
  eau            : number,
  indice_conso   : number,
  traitements    : lotTraitement[],
  description    : string,
}

export interface lotJournal {
  journal        : lotDailyData[];
}

export interface margeItem {
	ref         : string,
	label       : string,
	quantity    : number,
	unitvalue   : string,
	value       : number,
	comment     : string
}

export interface  marge {
	id            : number,
	lot_id        : number,
	produits      : margeItem[],
  total_produits: number,
	charges       : margeItem[],
  total_charges : number,
	marge         : number,
	marge_pa      : number,
	marge_mcarre  : number
}

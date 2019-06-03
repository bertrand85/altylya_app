export interface Elevage {
  id: number,
  name: string,
  numnational: string,
  streetone: string,
  streettwo: string,
  zipcode: string,
  city: string,
  lat: string,
  long: string,
  avatar: string,
  mobile_phone: string,
  work_phone: string
}
/* elevage base data */
export interface myElevageJson {
  id: number,
  name: string,
  address: adressJson,
  numeroIdentification:string,
  telephone:string,
  mobilephone:string,
  batiments: batimentJson[],

}

/* batiment base data */
export interface batimentJson {
  id : number,
  name : string,
  code : string,
  address : adressJson,
  batimentType:number,
  silos: siloJson[]
}

/* batiment silo datas */
export interface siloJson {
  id: number,
  code: string,
  maxqtty:number
}

/* address record */
export interface adressJson {
  id: number,
  street: string,
  street2: string,
  zipcode:string,
  town:string,
  country:string,
  latitude:number,
  longitude:number
}




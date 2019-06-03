/* elevage datas */
export interface elevageInterface {
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

/* batiment avi datas */
export interface batimentAviInterface {
  id: number,
  elevage_id: number,
  name: string,
  streetone: string,
  streettwo: string,
  zipcode: string,
  city: string,
  lat: string,
  long: string,
  avatar: string,
  structure: number,
  sol: number,
  ventilation: number,
  surface: number,
  surface_parcour: number,
  silos:siloInterface[]
}

/* batiment silo datas */
export interface siloInterface {
  id: number,
  code: string,
  maxqtty:number
}

/* follower */
export interface followers {
  id : number,
  email : string,
  user_id : number,
  status : number // 0 non autorise, 1 autorise, 10 en attente autorisation eleveur
}

export interface AppOptions {
  apikey: string,
  apiurl: string
}

export let ALTYLYA_API = {
  imgurl:'https://api060.altylya.com/images',
  url : 'https://apiaccess060.altylya.com/api',
  urlapi2 : 'https://api060.altylya.com/',
  // imgurl:'http://api2altylya.test/images',
  // url : 'http://api.altylya.test/api',
  // urlapi2 : 'http://api2altylya.test/',
  user_login        : '/post/user/login',
  user_status_get   : '/get/user/status',
  user_signup       : '/post/user/register',
  user_logout       : '/get/user/logout',
  user_saisieref_get: '/get/lot/references',
  elevage_own_get   : '/get/elevage/own',
  elevage_own_post  : '/post/elevage/own',
  elevage_own_put   : '/put/elevage/own',
  elevage_followers_get : '/get/elevage/follower',
  elevage_followers_post : '/post/elevage/follower',
  elevage_followers_put : '/put/elevage/follower',
  elevage_followers_delete : '/delete/elevage/follower',
  batiment_get   : '/get/elevage/batiments',
  batiment_post  : '/post/elevage/batiments',
  batiment_put   : '/put/elevage/batiments',
  batiment_delete   : '/delete/elevage/batiments',
  elevage_lot_post       : '/post/elevage/lots',
  elevage_lot_put       : '/put/elevage/lots',
  lot_journal_get       : '/get/lot/journal',
  lot_journal_post       : '/post/lot/daily',
  lot_journal_put       : '/put/lot/daily',
  followed_get : '/get/followed/liste',
  followed_post : '/post/followed/liste',
  followed_delete : '/delete/followed/liste',
  followed_getlots : '/get/followed/lots',
  followed_mortalite : '/get/followed/mortalite',
  followed_croissance : '/get/followed/croissance'
};

export let ALTYLYA_USERTYPE = {
  eleveur : 1,
  technicien : 2,
  veterinaire : 3
};



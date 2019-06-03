import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the SharingmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sharingmap',
  templateUrl: 'sharingmap.html',
})
export class SharingmapPage {

 /* map: GoogleMap;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }


  loadMap() {
    alert('sds');
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = GoogleMaps.create(element);

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }*/
}

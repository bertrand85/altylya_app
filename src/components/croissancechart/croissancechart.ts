import { Component, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

import Moment from 'moment';
import { extendMoment } from 'moment-range';


const moment = extendMoment(Moment);

/**
 * Generated class for the CroissancechartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'croissancechart',
  templateUrl: 'croissancechart.html'
})
export class CroissancechartComponent {

  @ViewChild('lineCanvas') lineCanvas;
  @Input('datas') datasToUse;
  @Input('showChart') showChartToUse;
  lineChart: any;
  titre : string;
  datas : any = null;
  showChart =false;

  labels : Array<any> = [];
  lotSerie : Array<any> = [];
  lotSerie2 : Array<any> = [];

  constructor() {
    console.log('Hello CroissancechartComponent Component');

  }
  toDate(dateString) {
    return moment(dateString, 'YYYY-MM-DD').toDate();
  }

  ngOnChanges() {

    console.log('change');
    this.datas = this.datasToUse;
    console.log(this.datas);

    let timeFormat = 'DD/MM';

    // pas de datas, pas de graphe
    if(!this.datas)
      return false;

    // reinit les séries
    this.lotSerie = [];
    this.lotSerie2 = [];
    this.labels  = [];


    this.labels=  [ // Date Objects
      this.toDate('2018-02-01'),
      this.toDate('2018-02-08'),
      this.toDate('2018-02-12'),
      this.toDate('2018-02-15'),
      this.toDate('2018-02-22'),
      this.toDate('2018-02-24'),
      this.toDate('2018-03-01'),
      this.toDate('2018-03-08')

    ];

    this.lotSerie2 = [
      {
        x:'12/02',
        y: 0.300
      },
      {
        x:'22/02',
        y: 0.600
      },
      {
        x:'24/02',
        y: 1.2
      },
    ];

    this.lotSerie = [
      {
        x:'01/02',
        y: 0.150
      },
      {
        x:'08/02',
        y: 0.250
      },
      {
        x:'15/02',
        y: 0.4
      },
      {
        x:'22/02',
        y: 0.8
      },
      {
        x:'01/03',
        y: 1.2
      },
      {
        x:'08/03',
        y: 1.7
      },
    ];

    if(this.datas.label == 'Croissance') {
      /* for (let i = 0; i < this.datas.data.poids.length; i++) {
         if(this.datas.data.poids[i]!='')
           this.lotSerie.push(this.datas.data.poids[i]);
         else
           this.lotSerie.push(null);
       }
       for (let i = 0; i < this.datas.data.objectifs.length; i++) {
         if(this.datas.data.objectifs[i]!='')
           this.lotSerie2.push(this.datas.data.objectifs[i]);
         else
           this.lotSerie2.push(null);

       }

       for (let i = 0; i < this.datas.data.serielabel.length; i++) {
         if(this.datas.data.serielabel[i]!='')
           this.labels.push(this.datas.data.serielabel[i]);
         else
           this.labels.push('');
       }*/


    }

    this.showChart = this.showChartToUse;
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      options: {
        responsive: true,
        legend: {
          position: "bottom",
        },
        scales: {
          xAxes: [{
            type: "time",
            time: {
              unit:'day',
              displayFormats: {
                day: 'DD'
              },
              format: timeFormat,
              // round: 'day'
              tooltipFormat: 'DD/MM'
            },
            scaleLabel: {
              display: false,
              labelString: 'Date'
            }
          }, ],
          yAxes: [{
            scaleLabel: {
              display: false,
              labelString: 'value'
            },
            ticks: {
              max: 2,
              min: 0,
              stepSize: 0.5
            }
          }]
        },
      },
      data: {
        labels: this.labels,

        datasets: [
          {
            label: "Lot",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(7255, 180, 0,0)",
            borderColor: "rgb(120, 0, 255)",
            borderWidth: 1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgb(120, 0, 255)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(120, 0, 255)",
            pointHoverBorderColor: "rgb(120, 0, 255)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.lotSerie,
            spanGaps: true,
          },
          {
            label: "Objectifs",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(7255, 180, 0,0)",
            borderColor: "rgba(255, 180, 0,1)",
            borderWidth: 1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(255, 180, 0,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255, 180, 0,1)",
            pointHoverBorderColor: "rgba(255, 180, 0,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.lotSerie2,
            spanGaps: true,
          }
        ]
      }

    });
  }
}

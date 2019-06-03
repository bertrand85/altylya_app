import { Component, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import Moment from 'moment';
import { extendMoment } from 'moment-range';


const moment = extendMoment(Moment);

/**
 * Generated class for the LotchartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lotchart',
  templateUrl: 'lotchart.html'
})
export class LotchartComponent {
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
    console.log('Hello LotchartComponent Component');


  }
  toDate(dateString)  {
    return moment(dateString, 'YYYY-MM-DD').toDate();
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {

    console.log('change');
    this.datas = this.datasToUse;
    console.log(this.datas);

    this.lotSerie = [];
    this.lotSerie2 = [];
    this.labels  = [];

    // pas de datas, pas de graphe
    if(!this.datas) {
      this.showChart = false;
      this.lineChart = null;
      return false;

    }
    this.showChart = true;

    this.lotSerie = [];
    if(this.datas.label == 'Mortalité') {

    	this.makeMortaliteChart();

    }

    if(this.datas.label == 'Croissance') {

		this.makeCroissanceChart();
    }

    //this.showChart = this.showChartToUse;

  }

  /**
   * reparti les données du graphe de croissance
   * @returns {boolean}
   */
  makeCroissanceChart() {
  	    let timeFormat = 'DD/MM';

    // pas de datas, pas de graphe
    if(!this.datas)
      return false;

    // reinit les séries
    this.lotSerie = [];
    this.lotSerie2 = [];
    this.labels  = [];


    let i=0;
    for(i=0;i<this.datas.data.serielabel.length;i++) {
      this.labels.push(this.toDate(this.datas.data.serielabel[i]))
    }
   /* this.labels=  [ // Date Objects
      this.toDate('2018-02-01'),
      this.toDate('2018-02-08'),
      this.toDate('2018-02-12'),
      this.toDate('2018-02-15'),
      this.toDate('2018-02-22'),
      this.toDate('2018-02-24'),
      this.toDate('2018-03-01'),
      this.toDate('2018-03-08')

    ];*/

    let poids = [];
    for(let d=0; d<this.datas.data.poids.length; d++) {
      poids.push( { 'x':moment(this.datas.data.poids[d]['x'], 'YYYY-MM-DD').toDate(), 'y':this.datas.data.poids[d]['y'] });
    }
    this.lotSerie = poids;

    let objectifs = [];
    for(let d=0; d<this.datas.data.objectifs.length; d++) {
      objectifs.push( { 'x':moment(this.datas.data.objectifs[d]['x'], 'YYYY-MM-DD').toDate(), 'y':this.datas.data.objectifs[d]['y'] });
    }
    this.lotSerie2 = objectifs;


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
              parser: timeFormat,
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
              /*max: 5,*/
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

  /**
   * données du graphe mortalité
   */
  makeMortaliteChart() {

    let localDatas = [];
      let start = 1;
   	      for(let i=0;i<this.datas.obj.length; i++ ) {
              let sem = parseInt(this.datas.obj[i].semaine);
              for(let j=start; j<=sem;j++) {
                localDatas.push({'semaine':j, 'morts':null, 'obj':this.datas.obj[i].mortalite});
              }
              start = sem+1;
          }

    for (let i = 0; i < this.datas.data.length; i++) {
      console.log(this.datas.data[i].mortalite);

      localDatas[this.datas.data[i].week].morts = this.datas.data[i].mortalite;

    }
        console.log(localDatas);
    for (let i = 0; i < localDatas.length; i++) {

      this.lotSerie.push(localDatas[i].morts);
      this.lotSerie2.push(localDatas[i].obj);
      this.labels.push('s' + localDatas[i].semaine);
    }


    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      options: {
        responsive: true,
        legend: {
          position: "bottom",
        }
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

  closechart() {
    this.datas = null;
    this.showChart = false;
  }
}

import {  Component, Input, ViewChild , ElementRef, HostListener} from '@angular/core';
// from https://www.html5canvastutorials.com/tutorials/html5-canvas-arcs/
/**
 * Generated class for the AltylyagaugeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'altylyagauge',
  templateUrl: 'altylyagauge.html'
})
export class AltylyagaugeComponent {
  @ViewChild('gauge') elCanvas: ElementRef;
  @ViewChild('gaugeContainer') gaugeContainer: ElementRef;
  @Input('min') minToUse;
  @Input('max') maxToUse;
  @Input('value') valueToUse;
  @Input('options') optionsToUse;

  @HostListener('window:resize')
  onWindowResize() {
    this.init();
  }

  x = 1;
  y = 1;
  radius = 1;
  min : number = 1.150;
  max : number = 1.350;
  objectif :number = 0;
  value = 1.300;

  reverseColors = false;
  title = '';
  unite = '';
  unitePosition='end';

  valueArcColors : any;



  endangle_position = 0.7;
  lineWidth = 3;

  colorsGreen  = ['#18c600',
    '#0c5900',
    '#0b5100'];

  colorsGreenBlack  = ['#128c00',
    '#094600',
    '#094600'];

  colorsOrange  = ['#ffdf16',
    '#ff9f19',
    '#ff9f19'];

  colorsRed  = ['#ffc109',
    '#ff3909',
    '#ce0000'];

  colorsMaroon  = ['#ff0909',
    '#990000',
    '#990000'];

  constructor() {
    console.log('Hello AltylyagaugeComponent Component');

  }

  ngAfterViewInit() {



  }

  init() {

    this.initCanvas();
    this.calcValues();
    this.configColor();
    this.drawBackArc();
    this.drawValueArc();
    this.drawValueText();
    this.drawObjectif();
    this.drawTitle();
    this.drawSubLine();
  }

  ngOnChanges() {

    if(typeof this.minToUse==='string')
      this.min = parseFloat( this.minToUse );
    else
      this.min = this.minToUse;

    if(typeof this.minToUse==='string')
      this.max = parseFloat(this.maxToUse);
    else
      this.max = this.maxToUse;

    this.value = this.valueToUse;

    if(this.optionsToUse['reverseColors'])
      this.reverseColors = this.optionsToUse['reverseColors'];

    if(this.optionsToUse['title'])
      this.title = this.optionsToUse['title'];

    if(this.optionsToUse['unite'])
      this.unite = this.optionsToUse['unite'];

    if(this.optionsToUse['unitePosition'])
      this.unitePosition = this.optionsToUse['unitePosition'];

    this.init();
  }

  /**
   * initialise canvas size
   */
  initCanvas() {
    this.elCanvas.nativeElement.width = this.gaugeContainer.nativeElement.clientWidth;
    this.elCanvas.nativeElement.height = this.gaugeContainer.nativeElement.clientWidth;

    this.x = Math.floor(this.elCanvas.nativeElement.width / 2);
    this.y = Math.floor(this.elCanvas.nativeElement.height / 2);
    this.radius = Math.floor(this.elCanvas.nativeElement.height / 2)-5;

  }

  calcValues() {
    // calc controle
    let value1_5 : number = ( this.min + this.max)/2;
    this.objectif =Math.floor( value1_5 * 1000) / 1000;

    // value > 1.5 then calc
    //debugger;
    if (this.value < value1_5) {
      let ecart0 = value1_5 - this.min;
      let position_pourcentage = Math.floor( ( this.value - this.min) / ecart0 *100 ) / 100;

      this.endangle_position = 0.75 + ( 0.75 * position_pourcentage) ;

      if(this.endangle_position<0.75)
        this.endangle_position = 0.77;
    }
    if (this.value == value1_5) {

      this.endangle_position = 1.5 ;

    }
    if (this.value > value1_5) {
      let ecart1_5 = this.max - value1_5;
      let position_pourcentage = Math.floor( (this.value - value1_5) / ecart1_5 *100 ) / 100;

      this.endangle_position = 1.5 + ( 0.75 * position_pourcentage) ;

      if(this.endangle_position>2.25)
        this.endangle_position = 0.23;
    }

  }

  /**
   * set back arc
   */
  drawBackArc() {

    let contextBack = this.elCanvas.nativeElement.getContext('2d');
    let startAngleBack = 0.75 * Math.PI;
    let endAngleBack = 0.25 * Math.PI;
    let counterClockwiseBack = false;

    contextBack.beginPath();
    contextBack.arc(this.x, this.y, this.radius, startAngleBack, endAngleBack, counterClockwiseBack);
    contextBack.lineWidth = this.lineWidth;

    // line color
    contextBack.strokeStyle = '#eeeeee';
    contextBack.stroke();

  }

  /**
   * set arc for value
   */
  drawValueArc() {
    let context = this.elCanvas.nativeElement.getContext('2d');
    let startAngle = 0.75 * Math.PI;
    let endAngle = this.endangle_position * Math.PI;
    let counterClockwise = false;

    context.beginPath();
    context.arc(this.x, this.y, this.radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = this.lineWidth;

    // create radial gradient
    let grd = context.createRadialGradient(Math.floor(this.elCanvas.nativeElement.width/3),
      Math.floor(this.elCanvas.nativeElement.height),
      Math.floor(this.elCanvas.nativeElement.width/6),
      Math.floor(this.elCanvas.nativeElement.width/3),
      Math.floor(this.elCanvas.nativeElement.height/6),
      this.elCanvas.nativeElement.width);
    // light blue
    grd.addColorStop(0, this.valueArcColors[0]);
    // dark blue
    grd.addColorStop(0.5, this.valueArcColors[1]);
    grd.addColorStop(0.7, this.valueArcColors[2]);
    // line color
    context.strokeStyle = grd;
    context.stroke();
    //  context.fillStyle = grd;
  }

  /**
   * trait de séparation des infos
   */
  drawSubLine() {
    let context = this.elCanvas.nativeElement.getContext('2d');
    let fontHeight =  Math.floor(this.elCanvas.nativeElement.width / 7);

    let xStart = Math.floor(this.elCanvas.nativeElement.width / 2) - (fontHeight);
    let xEnd = Math.floor(this.elCanvas.nativeElement.width / 2) + (fontHeight);
    let y = Math.floor((this.elCanvas.nativeElement.height / 2) + (fontHeight*0.9) );
    let lineHeight = Math.floor(fontHeight/5);

    let grd = context.createLinearGradient(xStart, y-10, xEnd, y+10);

    // light blue
    grd.addColorStop(0, '#ffdf16');
    // dark blue
    grd.addColorStop(1, '#ff9f19');

    context.beginPath();
    context.moveTo(xStart, y);
    context.lineTo(xEnd, y);
    //context.lineWidth( lineHeight )
    context.lineWidth = lineHeight;

    // set line color
    context.strokeStyle = grd;
    context.stroke();



  }

  /**
   * texte valeur
   */
  drawValueText() {
    let context = this.elCanvas.nativeElement.getContext('2d');
    let texte = this.value.toString();
    if(this.unite != '') {
      if(this.unitePosition=='end')
        texte = texte + this.unite;
      else
        texte = this.value.toString().replace('.',this.unite);

    }
    let fontHeight =  Math.floor(this.elCanvas.nativeElement.width / 7);
    // text
    context.font = fontHeight +'pt Calibri';
    context.textAlign = 'center';
    context.fillStyle = '#333333';
    context.fillText(texte, this.x, this.elCanvas.nativeElement.height/2 );


  }

  /**
   * texte objectif
   */
  drawObjectif() {
    let context = this.elCanvas.nativeElement.getContext('2d');
    let texte = this.objectif.toString();
    if(this.unite != '') {
      if(this.unitePosition=='end')
        texte = texte + this.unite;
      else
        texte = this.objectif.toString().replace('.',this.unite);

    }

    texte = 'obj. '+texte;
    let fontHeight =  Math.floor(this.elCanvas.nativeElement.width / 12);
    // text
    context.font = fontHeight +'pt Calibri';
    context.textAlign = 'center';
    context.fillStyle = '#333333';
    context.fillText(texte, this.x, this.elCanvas.nativeElement.width/2 - Math.floor(fontHeight*3));


  }

  /**
   * titre du graphe
   */
  drawTitle() {
    let context = this.elCanvas.nativeElement.getContext('2d');
    let texte = this.title;
    let fontHeight =  Math.floor(this.elCanvas.nativeElement.width / 10);
    let y = Math.floor((this.elCanvas.nativeElement.height / 2) + ((this.elCanvas.nativeElement.width / 7) * 2) );

    // text
    context.font = fontHeight +'pt Calibri';
    context.textAlign = 'center';
    context.fillStyle = '#333333';
    context.fillText(texte, this.x, y);


  }

  /**
   * arc value color array config
   */
  configColor() {
    if(this.endangle_position>0.5 && this.endangle_position <= 1.1) {
      this.valueArcColors = this.colorsGreenBlack;

      if(this.reverseColors==true) {
        this.valueArcColors = this.colorsMaroon;
      }
    }

    if(this.endangle_position > 1.1 && this.endangle_position<=1.3) {
      this.valueArcColors = this.colorsGreen;

      if(this.reverseColors==true) {
        this.valueArcColors = this.colorsRed;
      }
    }

    if(this.endangle_position > 1.3 && this.endangle_position<=1.5) {
      this.valueArcColors = this.colorsOrange;

      if(this.reverseColors==true) {
        this.valueArcColors = this.colorsRed;
      }
    }

    if(this.endangle_position > 1.5 && this.endangle_position<=1.9) {
      this.valueArcColors = this.colorsRed;

      if(this.reverseColors==true) {
        this.valueArcColors = this.colorsGreen;
      }
    }

    if(this.endangle_position > 1.9 || this.endangle_position<0.5) {
      this.valueArcColors = this.colorsMaroon;

      if(this.reverseColors==true) {
        this.valueArcColors = this.colorsGreenBlack;
      }
    }
  }
}

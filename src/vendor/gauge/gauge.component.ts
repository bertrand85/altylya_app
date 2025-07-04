/**
 * @category   Component
 * @package    com.kiwity.gauge.gauge
 * @author     Salvador Subarroca (subarroca@gmail.com)
**/




// ANGULAR
import { Component, OnInit, Input } from '@angular/core';




// EXTERNAL



// OWN
import { GaugeSegment } from './shared/gauge-segment';
import { GaugeLabel } from './shared/gauge-label';





@Component({
  selector: 'ng-gauge',
  templateUrl: './gauge.component.html',
  //styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {
  @Input() bgRadius = 100;
  @Input() bgColor: string;
  @Input() rounded = true;
  @Input() reverse = false;
  @Input() animationSecs = 0.5;

  @Input() labels: GaugeLabel[];


  @Input()
  set segments(segments: GaugeSegment[]) {
    this.segmentsLoaded = false;
    this.sortedSegments = this.sortSegments(segments);

    // wait a bit and start animation
    setTimeout(
      () => this.segmentsLoaded = true,
      0);
  }
  sortedSegments: GaugeSegment[];
  segmentsLoaded = false;

  isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);



  constructor() { }

  ngOnInit() {
  }

  sortSegments(segments: GaugeSegment[]) {
    return segments && segments.sort((a: GaugeSegment, b: GaugeSegment) => {
      if (this.reverse) {
        return (a.value / a.goal > b.value / b.goal) ? 1 : -1;
      } else {
        return (a.value / a.goal > b.value / b.goal) ? -1 : 1;
      }
    });
  }

}

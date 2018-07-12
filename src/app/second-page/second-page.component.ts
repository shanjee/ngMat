import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { GaugeService } from '../Services/gauge.service';
import { Observable } from 'rxjs';
import { SpeedoMeter } from '../speedo-meter';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit, OnDestroy {

  percentageValue: (value: number) => string;

  // speedoMeters: AngularFireList<any>; //Observable<any[]>;
  speedoMeters: Observable<SpeedoMeter[]>;
  speedNow: any;
  newSpeedoMeter: SpeedoMeter;

  constructor(public gaugeService: GaugeService) {

    this.speedoMeters = gaugeService.getAllSpeedometer();

    this.percentageValue = function (value: number): string {
      return `${Math.round(value)} / ${this['max']}`;
    }
  }

  gaugeValues: any = {
    1: 180,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50
  };

  interval: any;

  ngOnInit(): void {
    const updateValues = (): void => {
      this.gaugeValues = {
        1: Math.round(Math.random() * 170),
        2: Math.round(Math.random() * 100),
        3: Math.round(Math.random() * 100),
        4: Math.round(Math.random() * 100),
        5: Math.round(Math.random() * 200),
        6: Math.round(Math.random() * 100),
        7: Math.round(Math.random() * 100)
      };

      var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute: 'numeric', hour12: false };
      this.newSpeedoMeter = { content: this.gaugeValues[1] , time: new Date().toLocaleDateString(undefined, options) };
      
      this.gaugeService.createSpeedometer(this.newSpeedoMeter);
    };

    const INTERVAL: number = 2000;

    this.interval = setInterval(updateValues, INTERVAL);
    updateValues();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  // Codes can be seen in https://www.npmjs.com/package/ngx-gauge
  gaugeType = "arch";
  gaugeValue = 65;
  gaugeLabel = "Speed";
  gaugeAppendText = "km/hr";
  max = 280;

  thresholdConfig = {
    '0': { color: 'green' },
    '40': { color: 'blue' },
    '75': { color: 'yello' },
    '100': { color: 'orange' },
    '125': { color: 'red' }
  };
}

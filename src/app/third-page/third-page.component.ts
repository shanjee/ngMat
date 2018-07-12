// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GaugeService } from '../Services/gauge.service';
import { SpeedoMeter } from '../speedo-meter';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {

  // lineChart
  public lineChartLabels: Array<any> = ['8.00'];

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81], label: 'Speed Km/h' }
    // ,{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];

  speedoMeters: Observable<SpeedoMeter[]>;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(public gaugeService: GaugeService) {
    this.speedoMeters = gaugeService.getAllSpeedometer();
    this.populateChartDate();

  }

  ngOnInit() {
    // @ViewChild(BaseChkcartDirective) chart: BaseChartDirective;
  }

  public lineChartOptions: any = {
    responsive: true
  };


  public lineChartColors: Array<any> = [
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)', 
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // },
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {

    // let _lineChartData: Array<any> = new Array(this.lineChartData.length);

    // for (let i = 0; i < this.lineChartData.length; i++) {
    //   _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
    //   for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //     _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //   }
    // }
    // this.lineChartData = _lineChartData;

    this.populateChartDate();
  }

  public populateChartDate(): void {
    this.speedoMeters.subscribe((reading) => {
      let readingLocal = <SpeedoMeter[]>reading;

      if (SpeedoMeter) {


        let _lineChartData = Array<any>();// = new Array(this.lineChartData.length);
        let _lineChartLabels = Array<any>();// = new Array(this.lineChartData.length);

        // this.lineChartLabels.length = 0;
        // for (let i = 0; i < 10; i++) {
        //   this.lineChartLabels.push(i);
        // }

        readingLocal.forEach(a => {
          
          this.lineChartLabels.push(a.time);
          this.lineChartData.push(a.content);

          _lineChartData.push(a.content);
          _lineChartLabels.push(a.time);

          this.lineChartLabels = _lineChartLabels;
          this.lineChartData = _lineChartData;
          
          this.chart.chart.config.data.labels = this.lineChartLabels;
          this.chart.chart.config.data.data = this.lineChartData;
          console.log(a.time);
        });

        console.log("length: ", this.lineChartLabels.length);
      }
    });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

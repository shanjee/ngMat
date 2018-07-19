// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GaugeService } from 'src/app/Services/gauge.service';
import { SpeedoMeter } from 'src/app/Component/Model/speedo-meter';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

// https://stackblitz.com/edit/angular-highcharts-stock
import { StockChart } from 'angular-highcharts';
import { map } from 'rxjs/operators';
import { _MatChipMixinBase } from '@angular/material';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {

  // lineChart
  public lineChartLabels: Array<any> = ['8.00'];

  public myData: Array<number | [number, number] | [string, number]> = [];
  public myData2: any[] = [];
  public speedArray: number[] = [];
  public timeArray: number[] = [];
  public demoArray: Array<[number, number]> = [];

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81], label: 'Speed Km/h' }
    // ,{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  speedoMeters: Observable<SpeedoMeter[]>;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public stock: StockChart;

  constructor(public gaugeService: GaugeService) {
    this.speedoMeters = gaugeService.getAllSpeedometer();
  }

  // ngOnInit() {
  //   // @ViewChild(BaseChkcartDirective) chart: BaseChartDirective;

  // }

  ngOnInit() {
    this.populateChartDate();
    this.populateSpeedHystoryGraph(); //2nd 
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

    this.populateChartDate(); // 1st
    // this.populateSpeedHystoryGraph(); //2nd
  }

  public populateChartDate(): void {
    
    this.speedoMeters.subscribe((reading) => {

      let readingLocal = <SpeedoMeter[]>reading;
      this.myData2 = [];

      if (SpeedoMeter) {

        let _lineChartData = Array<any>();// = new Array(this.lineChartData.length);
        let _lineChartLabels = Array<any>();// = new Array(this.lineChartData.length);

        readingLocal.forEach(a => {

          this.lineChartLabels.push(a.time);
          this.lineChartData.push(a.content);

          _lineChartData.push(a.content);
          _lineChartLabels.push(a.time);

          this.lineChartLabels = _lineChartLabels;
          this.lineChartData = _lineChartData;

          this.chart.chart.config.data.labels = this.lineChartLabels;
          this.chart.chart.config.data.data = this.lineChartData;

          //2nd graph data
          this.myData2.push([a.time, a.content]);
          console.log(this.myData2);

        });        
        // console.log(this.myData2);
        this.populateSpeedHystoryGraph();
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

  // 2nd
  public populateSpeedHystoryGraph(): void {

    this.stock = new StockChart({
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Speed of your car km/h'
      },

      plotOptions: {
        series: {
          marker: {
            enabled: true
          },

          dataLabels: {
            enabled: true
          }
        }
      },

      series: [{
        // tooltip: {
        //   valueDecimals: 2
        // },
        name: 'Speed',
        data: this.myData2
        /*
                  [
                    [1293580800000, 46.47],
                    [1293667200000, 46.24],
                    [1293753600000, 46.08],
                    [1514246400000, 170.57],
                    [1531741020000, 146.08]
                  ]
        */
      }]
    });

  }

}

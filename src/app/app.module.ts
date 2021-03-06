import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from 'src/app/Component/my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTabsModule } from '@angular/material';

import { FirstPageComponent } from 'src/app/Component/first-page/first-page.component' //'./first-page/first-page.component';
import { SecondPageComponent } from 'src/app/Component/second-page/second-page.component';
import { ThirdPageComponent } from 'src/app/Component/third-page/third-page.component';


// related to angular Guage module : speedo meter
import { NgxGaugeModule } from 'ngx-gauge';

// https://mattlewis92.github.io/angular-gauge/docs/index.html
import { GaugeModule } from 'angular-gauge';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// charts library
import { ChartsModule } from 'ng2-charts';

// import { ChartsModule } from 'ng4-charts/ng4-charts';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

const appRoutes: Routes = [
  { path: 'first-page', component: FirstPageComponent },
  { path: 'second-page', component: SecondPageComponent },
  { path: 'third-page', component: ThirdPageComponent }
];


export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,

    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,

    // Guage module 
    NgxGaugeModule,
    GaugeModule.forRoot(),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database

    // charts 
    ChartsModule,
    ChartModule,
  ],
  //  providers: [],
  bootstrap: [AppComponent],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } // add as factory to your providers
  ]
})
export class AppModule { }

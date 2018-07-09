import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule , MatTabsModule } from '@angular/material';

import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';


// related to angular Guage module : speedo meter
import { NgxGaugeModule } from 'ngx-gauge';

// https://mattlewis92.github.io/angular-gauge/docs/index.html
import { GaugeModule } from 'angular-gauge';


const appRoutes: Routes = [
  { path: 'first-page', component: FirstPageComponent},
  { path: 'second-page', component: SecondPageComponent},
  { path: 'third-page', component: ThirdPageComponent}
];

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

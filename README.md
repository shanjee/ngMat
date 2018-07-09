# NgMat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.


create a new material angular
1) ng new ngMat


2) open the project
ng server --port 4021 --open

Add Angular Material

You can run the step 2 only, but if u get an error, then follow 1 and 2 
1) npm install --save @angular/material@next @angular/cdk@next
2) ng add @angular/material

3) Add Navigation Schematic 

`ng generate @angular/material:material-nav --name <component-name>` 

4) Generate component
ng generate component FirstPage

5) Install angular Guage module : Speedo meter

`npm install --save ngx-gauge`

6 ) install GaugeModule
`npm install ng2-gauge --save`

`npm install --save angular-gauge`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

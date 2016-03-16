import 'zone.js';
import 'reflect-metadata';
System.import("bootstrap/css/bootstrap.css!");

import {
  Component,
  View,
  enableProdMode
} from 'angular2/core';

import {
  RouteConfig,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS
} from 'angular2/router';

import {
  bootstrap,
  Title
} from 'angular2/platform/browser';

import NavbarComponent from './navbar.component';
import StartPageComponent from './start.page.component';
import LossPageComponent from './loss.page.component';
import LossesOverviewPageComponent from './lossOverview.page.component'
import AdminPageComponent from "./admin.page.component";
//enableProdMode();

//create a simple angular component
@Component({
  selector: 'oss-srp',
  directives: [NavbarComponent, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, Title],
  template: `
  <div class="loggedIn">
    <oss-srp-navbar></oss-srp-navbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  </div>
  <div class="loggedOut" *ngIf="!jwt">
    <div class="loginForm">
    </div>
  </div>
   `
})
@RouteConfig([
  {
    path: '/start',
    name: 'Start',
    component: StartPageComponent,
    useAsDefault: true
  },
  {
    path: '/losses/',
    name: 'Losses',
    component: LossesOverviewPageComponent
  },
  {
    path: '/loss/:id',
    name: 'Lossmail',
    component: LossPageComponent
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: AdminPageComponent
  }
])
class OssSrp {
  jwt: string;
  constructor(titleService:Title){
    titleService.setTitle("Omega Security Syndicate - SRP");
    if (localStorage && localStorage.jwt) this.jwt = localStorage.jwt;
  }
}

//start our app
export default function() {
  bootstrap(OssSrp, [ROUTER_PROVIDERS]);
}
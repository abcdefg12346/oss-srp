import {
  Component,
  View,
  enableProdMode
} from 'angular2/core';

import {
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS
} from 'angular2/router';

@Component({
  selector: 'oss-srp-navbar',
  template: `
  <div class="navbar navbar-static-top navbar-default">
  	<div class="container">
  		<div class="navbar-inner">
  			<a href="#" class="navbar-brand brand">Omega Security - Office of Ship Replacement</a>
  			<nav class="pull-right">
  				<ul class="navbar-nav nav">
  					<li><a [routerLink]="['Start']">Start</a></li>
  					<li><a [routerLink]="['Losses']">Your Losses</a></li>
  				</ul>
  			</nav>
  		</div>
  	</div>
  </div>
  `,
  directives: [ROUTER_DIRECTIVES]
})
class OssSrpNavbar {
  constructor(){

  }
}

export default OssSrpNavbar;
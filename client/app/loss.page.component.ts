import {
  Component,
  View,
  enableProdMode
} from 'angular2/core';

import {RouteParams} from 'angular2/router';

@Component({
  selector: 'oss-srp-page-start',
  template: `
  <h2>Fetching Loss #{{id}} </h2>
  `
})
class StartPageComponent {
  public id: Number = -1;
  constructor(private _routeParams: RouteParams){
    this.id = _routeParams.get("id");
  }
}

export default StartPageComponent;
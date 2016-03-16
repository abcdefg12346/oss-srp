import {
  Component,
  View,
  enableProdMode
} from 'angular2/core';

import {RouteParams} from 'angular2/router';

@Component({
  selector: 'oss-srp-page-start',
  template: `
  <h2>Welcome to the SRP shit</h2>
  `
})

class StartPageComponent {
  constructor(){
  }
}

export default StartPageComponent;
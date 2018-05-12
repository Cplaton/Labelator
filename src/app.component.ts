import { Component } from '@angular/core';

@Component({
  selector: 'labels-app',
  template: `
	<nav>
	    <div class="nav-wrapper teal">
	      <a href="#" class="brand-logo center">Labelator</a>
	    </div>
	</nav>
	<router-outlet></router-outlet>
  `
})
export class AppComponent {

}

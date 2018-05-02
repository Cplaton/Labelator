import { Component } from '@angular/core';

@Component({
	selector: 'page-404',
	template: `
    <div class='center'>
      <img src="app/assets/404hop.jpg" />
      <h1>Hey, cette page n'existe pas !</h1>
      <a routerLink="/beers" class="waves-effect waves-teal btn-flat">
        Retourner à l' accueil
      </a>
    </div>
  `
})
export class PageNotFoundComponent { }

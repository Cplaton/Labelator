import { Component, OnInit } from '@angular/core';
import { Beer } from './beer';
import { BEERS } from './mock-beers';
import { Router } from '@angular/router';
import { BeerService } from './beer.service';

@Component({
	selector: 'list-beer',
	template: `
    <h1 class='center'>Bières</h1>
      <div class='container'>
        <div class="row">
        <div *ngFor='let beer of beers' class="col s6 m4">
          <div class="card horizontal" (click)="selectBeer(beer)" beer-shadow-card>
            <div class="card-image">
              <img [src]="beer.picture">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p>{{ beer.name }}</p>
                <p><small>{{ beer.created | date:"dd/MM/yyyy" }}</small></p>
                <span *ngFor='let type of beer.types' class="{{ type | beerTypeColor }}">{{ type }}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  `
})
export class ListBeerComponent implements OnInit {

	beers: Beer[] = null;

	constructor(
    private router: Router,
    private beerService: BeerService ) { }

	ngOnInit(): void {
    this.getBeer();
  }

  getBeer(): void {
    this.beers = this.beerService.getBeers();
  }

	selectBeer(beer: Beer): void {
		console.log('Vous avez selectionné ' + beer.name);
		let link = ['/beer', beer.id];
		this.router.navigate(link);
	}

}

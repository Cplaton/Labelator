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
            <!--<div class="card-image">
            </div>-->
            <div class="card-stacked">
              <div class="card-content">
                <p> <img [src]="beer.picture" /> {{ beer.name }} </p>
                <p><small>{{ beer.created | date:"dd/MM/yyyy" }}</small></p>
                <span *ngFor='let type of beer.types' class="{{ type | beerTypeColor }}">{{ type }}</span>
              </div>
            </div>
          </div>
        </div>
				<div class="col s6 m4">
          <div class="card horizontal" (click)="addBeer()" beer-shadow-card>
            <!--<div class="card">
            </div>-->
            <div class="card-stacked">
              <div class="card-content">
                <span class="card-title">Ajouter une nouvelle bière.</span>
								<h5 class="center"><img src="app/labels/assets/glyphicons/png/glyphicons-433-plus.png" /></h5>
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

	addBeer():void {
		let index = this.beerService.addBeer({
			id: this.beers.length+1,
			name: " ",
			ibu: 0,
			ebc: 0,
			alcool: 0,
			picture: "",
			types: [],
			created: new Date(),
			seed: Math.floor(Math.random() * 65536)
		});
		this.getBeer();
		console.log('Vers la création d\'une nouvelle bière : '+this.beers[this.beers.length-1]);
		let link = ['/beer/edit', index];
		this.router.navigate(link);
	}

}

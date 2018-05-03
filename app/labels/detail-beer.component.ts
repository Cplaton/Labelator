import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Beer } from './beer';
import { BEERS } from './mock-beers';
import { BeerService } from './beer.service';

@Component({
	selector: 'detail-beer',
	template: `
  <div *ngIf="beer" class="row">
  <div class="col s12 m8 offset-m2">
  <h2 class="header center">{{ beer.name }}</h2>
  <div class="card horizontal hoverable">
    <div class="card-image">
		<label-svg [beer]="beer"></label-svg>
      <!--<img [src]="beer.picture">-->
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <table class="bordered striped">
          <tbody>
            <tr>
              <td>Nom</td>
              <td><strong>{{ beer.name }}</strong></td>
            </tr>
						<tr>
							<td>Alcool</td>
							<td><strong>{{ beer.alcool }}%</strong></td>
						</tr>
            <tr>
              <td>EBC</td>
              <td><strong>{{ beer.ebc }}</strong></td>
            </tr>
            <tr>
              <td>IBU</td>
              <td><strong>{{ beer.ibu }}</strong></td>
            </tr>
            <tr>
              <td>Types</td>
              <td>
                <span *ngFor="let type of beer.types" class="{{ type | beerTypeColor }}">{{ type }}</span>
              </td>
            </tr>
            <tr>
              <td>Date de création</td>
              <td><em>{{ beer.created | date:"dd/MM/yyyy" }}</em></td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="card-action">
        <a (click)="goBack()">Retour</a>
				<a (click)="goEdit(beer)">Editer</a>
      </div>
    </div>
  </div>
  </div>
  </div>
  <h4 *ngIf='!beer' class="center">Aucune bière à afficher !</h4>
  `
})
export class DetailBeerComponent implements OnInit {

  beer: Beer = null;

  constructor(
    private route: ActivatedRoute,
		private router: Router,
    private beerService: BeerService) {} // on injecte ce service pour pouvoir l'utiliser dans le composant.

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.beer = this.beerService.getBeer(id); // on utilise le service pour récupérer une binouse en fonction de son identifiant.
    });
  }

  goBack(): void {
		let link = ['/beers'];
		this.router.navigate(link);
  }

	// On crée une méthode qui s'occupe de la redirection
	goEdit(beer: Beer): void {
	  let link = ['/beer/edit', beer.id];
	  this.router.navigate(link);
	}

}

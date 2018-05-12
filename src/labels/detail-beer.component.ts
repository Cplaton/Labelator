import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Beer } from './beer';
import { BEERS } from './mock-beers';
import { BeerService } from './beer.service';
import { LabelSvgComponent } from './label-svg.component';
import { LabelCanvasComponent } from './label-canvas.component';

@Component({
	selector: 'detail-beer',
	template: `
  <div *ngIf="beer" class="row">
  <div class="col s12 m8 offset-m2">
  <h2 class="header center">{{ beer.name }}</h2>
  <div class="card horizontal hoverable">
    <div class="card-image">
		<!--<label-svg id="labelSvg" [beer]="beer" (click)="downloadImg()" #labelSvg></label-svg>-->
		<label-canvas id="labelCanvas" [beer]="beer" (click)="downloadImg()" #labelCanvas></label-canvas>
      <!--<img [src]="beer.picture">   -->
    </div>
    <div class="card-stacked">
      <div class="card-content" >
        <table class="bordered striped" >
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
              <td>Seed</td>
            	<td >{{ labelCanvas.seed.substring(0,15) }}...</td>
            </tr>
            <tr>
              <td>Date de création</td>
              <td><em>{{ beer.created | date:"dd/MM/yyyy" }}</em></td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="card-action">
        <a (click)="goBack()" style="cursor:pointer;">Retour</a>
				<a (click)="goEdit(beer)" style="cursor:pointer;">Editer</a>
				<a (click)="reRoll()" style="cursor:pointer;">Générer</a>
				<a (click)="saveImg()" style="cursor:pointer;">Sauver</a>
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
	// @ViewChild('labelSvg') labelSvg: LabelSvgComponent;
	@ViewChild('labelCanvas') labelCanvas: LabelCanvasComponent;
	@ViewChild('imgExport') imgExport: ElementRef;
	@ViewChild('canExport') canExport: ElementRef;

  constructor(
    private route: ActivatedRoute,
		private router: Router,
    private beerService: BeerService) {} // on injecte ce service pour pouvoir l'utiliser dans le composant.

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.beer = this.beerService.getBeer(id); // on utilise le service pour récupérer une binouse en fonction de son identifiant.
    });
		// this.imgExport.nativeElement.src=this.labelSvg.link;
  }

	ngAfterViewInit() {
      console.log("After detail view init");
      // this.imgExport.nativeElement.src=this.labelSvg.link;
			//  let canvas = this.canExport.nativeElement;
			//  let ctx = canvas.getContext('2d');
			//  ctx.fillStyle="balck";
			//  ctx.fillRect(0,0,3189,1890);
      //
			//  ctx.drawImage(this.imgExport.nativeElement, 0, 0, 3189, 1890);

    }

	downloadImg(): void {
		console.log("now downloading");
	}

  goBack(): void {
		let link = ['/beers'];
		this.router.navigate(link);
  }

	reRoll(): void {
		this.labelCanvas.reRoll();
		this.labelCanvas.reDraw();
		this.labelCanvas.updateLink();
		// this.labelSvg.reRoll();
		// this.labelSvg.updateLink();
    //
		// console.log("After detail view init");
		// this.imgExport.nativeElement.src=this.labelSvg.link;
		//  let canvas = this.canExport.nativeElement;
		//  let ctx = canvas.getContext('2d');
		//  ctx.fillStyle="balck";
		//  ctx.fillRect(0,0,3189,1890);
    //
		//  // let image = new Image();
		//  // image.src=this.labelSvg.link;
		//  ctx.drawImage(this.imgExport.nativeElement, 0, 0, 3189, 1890);
  }

	saveImg():void{
		this.beer.seed = this.labelCanvas.seed;
	}

	// On crée une méthode qui s'occupe de la redirection
	goEdit(beer: Beer): void {
	  let link = ['/beer/edit', beer.id];
	  this.router.navigate(link);
	}

}

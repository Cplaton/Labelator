import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Beer } from './beer';
import { BEERS } from './mock-beers';
import { BeerService } from './beer.service';
import { LabelSvgComponent } from './label-svg.component';

@Component({
	selector: 'detail-beer',
	template: `
  <div *ngIf="beer" class="row">
  <div class="col s12 m8 offset-m2">
  <h2 class="header center">{{ beer.name }}</h2>
  <div class="card horizontal hoverable">
    <div class="card-image">
		<label-svg id="labelSvg" [beer]="beer" (click)="downloadImg()" #labelSvg></label-svg>
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
            	<td >{{ labelSvg.seed.substring(0,15) }}...</td>
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
				<a (click)="reRoll()">Générer</a>
				<a (click)="saveImg()">Sauver</a>
      </div>
    </div>
  </div>
	<img id="imgExport" #imgExport />
	<canvas id="canExport" width="3189" height="1890"#canExport > </canvas>
  </div>
  </div>
  <h4 *ngIf='!beer' class="center">Aucune bière à afficher !</h4>
  `
})
export class DetailBeerComponent implements OnInit {

  beer: Beer = null;
	@ViewChild('labelSvg') labelSvg: LabelSvgComponent;
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
      this.imgExport.nativeElement.src=this.labelSvg.link;
			 let canvas = this.canExport.nativeElement;
			 let ctx = canvas.getContext('2d');
			 ctx.fillStyle="balck";
			 ctx.fillRect(0,0,3189,1890);

			 // let image = new Image();
			 // image.src=this.labelSvg.link;
			 ctx.drawImage(this.imgExport.nativeElement, 0, 0, 3189, 1890);

			//  image.onload = ( () => {
			// 	 	console.log("image loaded");
     //  		ctx.drawImage(image, 0, 0, 3189, 1890);
			// 		canvas.toBlob( (blob: any) => {
	   //       	var newImg = document.createElement("img");
	   //       	var url = URL.createObjectURL(blob);
	   //       	newImg.onload = ( () => URL.revokeObjectURL(url));
	   //       newImg.src = url;
			//  }, "image/jpeg", 0.8);
		 // });
			//  image.src=this.labelSvg.link;
    }

	downloadImg(): void {
		console.log("now downloading");
	}

  goBack(): void {
		let link = ['/beers'];
		this.router.navigate(link);
  }

	reRoll(): void {
		this.labelSvg.reRoll();
		this.labelSvg.updateLink();

		console.log("After detail view init");
		this.imgExport.nativeElement.src=this.labelSvg.link;
		 let canvas = this.canExport.nativeElement;
		 let ctx = canvas.getContext('2d');
		 ctx.fillStyle="balck";
		 ctx.fillRect(0,0,3189,1890);

		 // let image = new Image();
		 // image.src=this.labelSvg.link;
		 ctx.drawImage(this.imgExport.nativeElement, 0, 0, 3189, 1890);
  }

	saveImg():void{
		this.beer.seed = this.labelSvg.seed;
	}

	// On crée une méthode qui s'occupe de la redirection
	goEdit(beer: Beer): void {
	  let link = ['/beer/edit', beer.id];
	  this.router.navigate(link);
	}

}

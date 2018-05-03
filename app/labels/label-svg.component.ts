import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeerService} from './beer.service';
import { Beer } from './beer';

@Component({
  selector: 'label-svg',
  templateUrl: 'app/labels/label-svg.component.html',
  styleUrls: ['app/labels/label-svg.component.css']
})
export class LabelSvgComponent implements OnInit {

  @Input() beer: Beer; // propriété d'entrée du composant
  types: Array<string>;
  backgroundFill: string;
  rectFill: string;
  circleFill: string;
  titleFill: string;
  textFill: string;

  constructor(
    private beerService: BeerService,
    private router: Router) { }

  ngOnInit() {
    // Initialisation de la propriété types
    this.types = this.beerService.getBeerTypes();
    this.setRectColor();
    this.setBackgroundColor();
    this.setCircleColor();
    this.setTitleColor();
    console.log("background : "+this.backgroundFill);
    console.log("rect : "+this.rectFill);
    console.log("circle : "+this.circleFill);
    console.log("title : "+this.titleFill);
  }

  private setBackgroundColor(){
    let hue=(this.typeToColor(this.beer.types)*(45-this.beer.ebc))%360;
    let saturation=(this.beer.alcool>=12?100:100*(this.beer.alcool/12.0));
    let lightness=Math.round(50+40*((45-this.beer.ebc)/45)+10*((60-this.beer.ibu)/60));
    this.backgroundFill="hsl("+hue+","+saturation+"%,"+lightness+"%)";
  }

  private setRectColor(){
    let hue=(this.typeToColor(this.beer.types)*(45-this.beer.ebc)+180)%360;
    let saturation=(this.beer.alcool>=12?100:100*(this.beer.alcool/12.0));
    let lightness=Math.round(50-30*((45-this.beer.ebc)/45)-10*((60-this.beer.ibu)/60));
    this.rectFill="hsl("+hue+","+saturation+"%,"+lightness+"%)";
  }

  private setCircleColor(){
    let hue=(this.typeToColor(this.beer.types)*(45-this.beer.ebc)+180)%360;
    let saturation=(this.beer.alcool>=12?100:100*(this.beer.alcool/12.0));
    let lightness=Math.round(50+30*((45-this.beer.ebc)/45)+10*((60-this.beer.ibu)/60));
    this.circleFill="hsl("+hue+","+saturation+"%,"+lightness+"%)";
  }

  private setTitleColor(){
    let hue=(this.typeToColor(this.beer.types)*(60-this.beer.ibu)+180)%360;
    let saturation=(this.beer.alcool>=12?100:100*(this.beer.alcool/12.0));
    let lightness=Math.round(50+30*((45-this.beer.ebc)/45)+10*((60-this.beer.ibu)/60));
    this.titleFill="hsl("+hue+","+saturation+"%,"+lightness+"%)";
  }

  private typeToColor(type: Array<string>): number {

      let color: number;
      let counter: number;
      color=0;
      counter=0;
      for(let aType of type)
      {
        counter++;
        switch (aType) {
          case 'Ale':
          case 'Blonde':
          case 'Mars':
          case 'IPA':
          case 'Pale Ale':
          case 'Bitter':
          case 'Mild Ale':
            color += 50;
            break;
          case 'Abbaye':
          case 'Double':
          case 'Triple':
          case 'Quadruple':
          case 'Trappiste':
          case 'Saison':
          case 'Spéciale':
          case 'Garde':
          case 'Mars':
          case 'Cervoise':
            color += 30;
            break;
          case 'Ambrée':
          case 'Noël':
          case 'Barley wine':
            color += 20;
            break;
          case 'Brune':
          case 'Schwarzbier':
          case 'Porter':
          case 'Stout':
            color += 360;
            break;
          case 'Lambic':
          case 'Gueuze':
          case 'Faro':
          case 'Sour':
            color += 130;
            break;
          case 'Red Ale':
            color += 0;
            break;
          case 'Blanche':
          case 'Kölsh':
          case 'Altbier':
          case 'Weizenbier':
          case 'Weinzenbock':
          case 'Pils':
          case 'Export':
          case 'Märzen':
          case 'Bock':
          case 'Doppelbock':
          case 'Eisbock':
          case 'Rauchbier':
          case 'Lagger':
            color += 80;
            break;
          default:
            color += 200;
            break;
        }
    }
    return Math.round(color/counter);
  }
}

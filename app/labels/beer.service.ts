import { Injectable } from '@angular/core';
import { Beer } from './beer';
import { BEERS } from './mock-beers';

@Injectable()
export class BeerService {
  // Retourne toutes les bières
  getBeers(): Beer[] {
    return BEERS;
  }

  // Retourne la bière avec l'identifiant passé en paramètre
  getBeer(id: number) {
    let beers = this.getBeers();

    for(let index = 0; index < beers.length; index++) {
      if(id === beers[index].id) {
        return beers[index];
      }
    }
  }

  addBeer(element: Beer): number{
      return BEERS.push(element);
  }

  // types de bière possible
  getBeerTypes(): Array<string> {
    return [
      'Abbaye','Double','Triple','Quadruple','Trappiste','Blanche','Brune','Blonde','Saison','Spéciale',
      'Noël','Bitter','Pale Ale','IPA','Mild Ale','Red Ale','Porter','Stout','Barley wine','Kölsh','Altbier',
      'Weizenbier','Weinzenbock','Garde','Mars','Pils','Export','Märzen','Bock','Doppelbock','Eisbock','Rauchbier',
      'Schwarzbier','Lambic','Gueuze','Faro','Sour','Cervoise','Ale','Lagger','Ambrée'
    ];
  }

  setBeerSeed(beer: Beer, str: string[]): string{
    let hex = "";
    for(let i=0;i<str.length;i++){
      if(i<str.length-1)
        hex+= str[i]+';';
      else
        hex+=str[i];
    }
    return btoa(hex);
  }

  randomizeBackgroundColor(beer: Beer): string{
    let hue=(this.typeToColor(beer.types)*(45-beer.ebc)*beer.name.length+Math.round((Math.random() * 60)-30))%360;
    let saturation= beer.alcool*Math.round(Math.random()*6)+Math.round(beer.ibu/(Math.random() *7));
    saturation = (saturation>100?100:saturation);
    let lightness=Math.round(50+40*((45-beer.ebc)/45)+10*((60-beer.ibu)/60));
    return "hsl("+hue+","+saturation+"%,"+lightness+"%)";
  }

  randomizeRectColor(beer: Beer): string{
    let hue=(this.typeToColor(beer.types)*(45-beer.ebc)*beer.name.length+Math.round((Math.random() * 60)-30)+180)%360;
    let saturation= beer.alcool*Math.round(Math.random()*6)+Math.round(beer.ibu/(Math.random() *7));
    saturation = (saturation>100?100:saturation);
    let lightness=Math.round(50-30*((45-beer.ebc)/45)-10*((60-beer.ibu)/60));
    return "hsl("+hue+","+saturation+"%,"+lightness+"%)";
  }

  randomizeCircleColor(beer: Beer): string{
    let hue=(this.typeToColor(beer.types)*(45-beer.ebc)*beer.name.length+Math.round((Math.random() * 60)-30)+180)%360;
    let saturation= beer.alcool*Math.round(Math.random()*6)+Math.round(beer.ibu/(Math.random() *7));
    saturation = (saturation>100?100:saturation);
    let lightness=Math.round(50+30*((45-beer.ebc)/45)+10*((60-beer.ibu)/60));
    return "hsl("+hue+","+saturation+"%,"+lightness+"%)";
  }

  randomizeTitleColor(beer: Beer): string{
    let hue=(this.typeToColor(beer.types)*(60-beer.ibu)*beer.name.length+Math.round((Math.random() * 60)-30)+180)%360;
    let saturation= beer.alcool*Math.round(Math.random()*6)+Math.round(beer.ibu/(Math.random() *7));
    saturation = (saturation>100?100:saturation);
    let lightness=Math.round(50+30*((45-beer.ebc)/45)+10*((60-beer.ibu)/60));
    return "hsl("+hue+","+saturation+"%,"+lightness+"%)";
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

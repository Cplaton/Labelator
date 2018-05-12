import { Pipe, PipeTransform } from '@angular/core';
import { Beer } from './beer';
/*
 * Affiche la couleur correspondant au type de la bière.
 * Prend en argument le type de bière.
 * Exemple d'utilisation:
 *   {{ beer.type | beerTypeColor }}
*/
@Pipe({name: 'beerTypeColor'})
export class BeerTypeColorPipe implements PipeTransform {
  transform(type: string): string {

    let color: string;

    switch (type) {
      case 'Ale':
      case 'Blonde':
      case 'Mars':
      case 'IPA':
      case 'Pale Ale':
      case 'Bitter':
      case 'Mild Ale':
        color = 'lime lighten-1';
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
        color = 'orange lighten-2';
        break;
      case 'Ambrée':
      case 'Noël':
      case 'Barley wine':
        color = 'brown lighten-2';
        break;
      case 'Brune':
      case 'Schwarzbier':
      case 'Porter':
      case 'Stout':
        color = 'brown lighten-1';
        break;
      case 'Lambic':
      case 'Gueuze':
      case 'Faro':
      case 'Sour':
        color = 'grey lighten-3';
        break;
      case 'Red Ale':
        color = 'red lighten-1';
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
        color = 'lime lighten-4';
        break;
      default:
        color = 'grey';
        break;
    }

    return 'chip ' + color;

  }
}

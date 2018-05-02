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

  // types de bière possible
  getBeerTypes(): Array<string> {
    return [
      'Abbaye','Double','Triple','Quadruple','Trappiste','Blanche','Brune','Blonde','Saison','Spéciale',
      'Noël','Bitter','Pale Ale','IPA','Mild Ale','Red Ale','Porter','Stout','Barley wine','Kölsh','Altbier',
      'Weizenbier','Weinzenbock','Garde','Mars','Pils','Export','Märzen','Bock','Doppelbock','Eisbock','Rauchbier',
      'Schwarzbier','Lambic','Gueuze','Faro','Sour','Cervoise','Ale','Lagger','Ambrée'
    ];
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeerService} from './beer.service';
import { Beer } from './beer';


@Component({
  selector: 'beer-form',
  templateUrl: 'app/labels/beer-form.component.html',
  styleUrls: ['app/labels/beer-form.component.css']
})
export class BeerFormComponent implements OnInit {

  @Input() beer: Beer; // propriété d'entrée du composant
  types: Array<string>; // types possibles d'une bière

  constructor(
    private beerService: BeerService,
    private router: Router) { }

  ngOnInit() {
    // Initialisation de la propriété types
    this.types = this.beerService.getBeerTypes();
    if(this.beer.name=="")
    {
      let index = this.beerService.getBeers().indexOf(this.beer, 0);
      if (index > -1) {
         this.beerService.getBeers().splice(index, 1);
      }
    }
  }

  hasIndex(index: number): boolean {
    let found=false
    for(let i=0;i<this.beerService.getBeers().length;i++)
    {
      if(this.beerService.getBeers()[i].id==index)
      {
        found=true;
      }
    }
    return found;
  }

  // Détermine si le type passé en paramètres appartient ou non à la bière en cours d'édition.
  hasType(type: string): boolean {
    let index = this.beer.types.indexOf(type);
    if (~index) return true;
    return false;
  }

  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type à la bière en cours d'édition.
  selectType($event: any, type: string): void {
    let checked = $event.target.checked;
    if ( checked ) {
      this.beer.types.push(type);
    } else {
      let index = this.beer.types.indexOf(type);
      if (~index) {
        this.beer.types.splice(index, 1);
      }
    }
  }

  // valide le nombre de 1-3 types par biere,
  // TODO : améliorer cette gestion en autorisant ou non l'utilisation conjointe de certains types.
  isTypesValid(type: string): boolean {
    if(this.beer.types.length >= 3 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  isSeedValid(str:string): boolean{
    console.log("str = "+str);
    if (str=="")
      return true;
    let real = atob(str);
    console.log("réelle = "+real);
    let regex = /(hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\);){3}(hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\))/g
    console.log("return = "+regex.test(real));
    return regex.test(real);
  }
  // La méthode appelée lorsque le formulaire est soumis.
  onSubmit(): void {
    if(!this.hasIndex(this.beer.id))
    {
      console.log("J'ajoute la bière à la liste !"+this.beer.toString());
      this.beerService.addBeer(this.beer);
    }
    console.log("Submit form ! : "+ JSON.stringify(this.beerService.getBeers()));
    let link = ['/beer', this.beer.id];
    this.router.navigate(link);
  }

}

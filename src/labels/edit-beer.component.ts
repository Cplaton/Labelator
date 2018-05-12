import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Beer } from './beer';
import { BeerService } from './beer.service';

@Component({
  selector: 'edit-beer',
  template: `
    <h2 class="header center">Editer {{ beer?.name }}</h2>
    <beer-form [beer]="beer"></beer-form>
  `,
})
export class EditBeerComponent implements OnInit {

  beer: Beer = null;

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.beer = this.beerService.getBeer(id);
  }

}

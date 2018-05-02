import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListBeerComponent }    from './list-beer.component';
import { DetailBeerComponent }  from './detail-beer.component';

import { EditBeerComponent }    from './edit-beer.component';

// routes definition
const beersRoutes: Routes = [
	{ path: 'beers', component: ListBeerComponent },
	{ path: 'beer/edit/:id', component: EditBeerComponent },
	{ path: 'beer/:id', component: DetailBeerComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(beersRoutes)
	],
	exports: [
		RouterModule
	]
})
export class BeerRoutingModule { }

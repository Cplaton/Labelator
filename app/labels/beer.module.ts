import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ListBeerComponent }   from './list-beer.component';
import { DetailBeerComponent } from './detail-beer.component';
import { ShadowCardDirective }    from './shadow-card.directive';
import { BeerTypeColorPipe }   from './beer-type-color.pipe';

import { FormsModule }   from '@angular/forms';
import { SeedValidator } from './seed.directive';
import { EditBeerComponent }   from './edit-beer.component';
import { BeerFormComponent }   from './beer-form.component';
import { LabelSvgComponent }   from './label-svg.component';

import { BeerRoutingModule } from './beer-routing.module';
import { BeerService }      from './beer.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BeerRoutingModule
  ],
  declarations: [
    ListBeerComponent,
    DetailBeerComponent,
    EditBeerComponent,
    BeerFormComponent,
    LabelSvgComponent,
    ShadowCardDirective,
    SeedValidator,
    BeerTypeColorPipe
  ],
  providers: [BeerService]
})
export class BeerModule {}

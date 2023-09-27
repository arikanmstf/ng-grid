import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';
import { RestaurantsTableComponent } from '../../components/restaurants-table/restaurants-table.component';

/* Module contains business logic to fetch restaurants data */
@NgModule({
  declarations: [RestaurantsComponent],
  imports: [CommonModule, RestaurantsRoutingModule, RestaurantsTableComponent],
})
export class RestaurantsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRestaurantComponent } from './manage-restaurant.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { ManageRestaurantRoutingModule } from './manage-restaurant-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [ManageRestaurantComponent],
  imports: [
    CommonModule,
    RestaurantCardComponent,
    ManageRestaurantRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ManageRestaurantModule {}

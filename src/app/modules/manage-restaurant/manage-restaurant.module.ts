import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { ManageRestaurantComponent } from './manage-restaurant.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { ManageRestaurantRoutingModule } from './manage-restaurant-routing.module';
import { LoaderComponent } from '../../components/loader/loader.component';

@NgModule({
  declarations: [ManageRestaurantComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RestaurantCardComponent,
    ManageRestaurantRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    LoaderComponent,
  ],
})
export class ManageRestaurantModule {}

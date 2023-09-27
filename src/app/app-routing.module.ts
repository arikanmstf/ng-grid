import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/restaurants/restaurants.module').then(
        m => m.RestaurantsModule
      ),
  },
  {
    path: 'manage-restaurant/:restaurantId',
    loadChildren: () =>
      import('./modules/manage-restaurant/manage-restaurant.module').then(
        m => m.ManageRestaurantModule
      ),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

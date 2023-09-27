import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageRestaurantComponent } from './manage-restaurant.component';

const routes: Routes = [{ path: '', component: ManageRestaurantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRestaurantRoutingModule {}

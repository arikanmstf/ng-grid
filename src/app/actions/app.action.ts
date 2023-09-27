// Read request parameter's state

import { GetRestaurantsParams } from '../services/restaurant.service';

export class GetRequestParamsForRestaurants {
  static readonly type = '[RestaurantParams] Get';
}

// Update request parameter's state
export class UpdateRequestParamsForRestaurants {
  static readonly type = '[RestaurantParams] Update';
  params: GetRestaurantsParams;

  constructor(params: GetRequestParamsForRestaurants) {
    this.params = params;
  }
}

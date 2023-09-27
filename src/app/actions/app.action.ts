// Read request parameter's state

import {
  GetRestaurantsParams,
  PaginationMeta,
  RestaurantDTO,
} from '../services/restaurant.service';

export class GetRequestParamsForRestaurants {
  static readonly type = '[RestaurantParams] Get';
}

// Update request parameter's state
export class UpdateRequestParamsForRestaurants {
  static readonly type = '[RestaurantParams] Update';
  data: GetRestaurantsParams;

  constructor(data: GetRestaurantsParams) {
    this.data = data;
  }
}

// Get restaurants from state
export class GetRestaurants {
  static readonly type = '[Restaurants] Get';
}

// Update request parameter's state
export class UpdateRestaurants {
  static readonly type = '[Restaurants] Update';
  restaurants: RestaurantDTO[];
  paginationMeta: PaginationMeta;

  constructor(restaurants: RestaurantDTO[], paginationMeta: PaginationMeta) {
    this.restaurants = restaurants;
    this.paginationMeta = paginationMeta;
  }
}

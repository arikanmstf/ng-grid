import { RestaurantResponse } from '../services/restaurant.service';

export class RestaurantsMockService {
  static getRestaurants(
    { numberOfRestaurants } = { numberOfRestaurants: 10 }
  ): RestaurantResponse {
    return {
      data: Array.from({ length: numberOfRestaurants }, () => {
        const index = Math.floor(Math.random() * 1000);
        return {
          id: `id-${index}`,
          status: index % 2 === 1 ? 'ACTIVE' : 'INACTIVE',
          name: `Restaurant name - ${index}`,
          address: {
            formattedAddress: `Address - ${index}`,
          },
          website: `http://www.website-${index}.co`,
        };
      }),
      meta: {
        page: 1,
        pageCount: 1,
        take: 10,
        itemCount: numberOfRestaurants,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}

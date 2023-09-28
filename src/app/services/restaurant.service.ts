import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PaginationMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  take: number;
}

/* Not mapping all the response dto, but only the ones used in this app */
export interface RestaurantDTO {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  address: {
    formattedAddress: string;
  };
  website?: string | null;
}

export interface RestaurantResponse {
  data: RestaurantDTO[];
  meta: PaginationMeta;
}

export type GetRestaurantsParams = {
  page?: number;
  take?: number;
  status?: '' | RestaurantDTO['status'];
};

export type PostManagerParams = {
  email: string;
  password: string;
};

const DEFAULT_REQUEST_PARAMS = {
  page: 1,
  take: 10,
};

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private url = 'https://dev-api.fudy.eu';

  constructor(private httpClient: HttpClient) {}
  getRestaurants(
    getRestaurantsParams: GetRestaurantsParams = DEFAULT_REQUEST_PARAMS
  ) {
    return this.httpClient.get<RestaurantResponse>(`${this.url}/restaurants`, {
      params: {
        page: getRestaurantsParams.page || DEFAULT_REQUEST_PARAMS.page,
        take: getRestaurantsParams.take || DEFAULT_REQUEST_PARAMS.take,
        ...(getRestaurantsParams.status
          ? { status: getRestaurantsParams.status }
          : {}),
      },
    });
  }

  postManager(
    restaurantId: RestaurantDTO['id'],
    postManagerParams: PostManagerParams
  ) {
    return this.httpClient.post(
      `${this.url}/restaurants/${restaurantId}/manager`,
      postManagerParams
    );
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import {
  RestaurantDTO,
  PaginationMeta,
  RestaurantService,
  GetRestaurantsParams,
} from '../../services/restaurant.service';
import { LoaderService } from '../../services/loader.service';
import { AppState } from '../../states/app.state';
import {
  GetRequestParamsForRestaurants,
  GetRestaurants,
  UpdateRequestParamsForRestaurants,
  UpdateRestaurants,
} from '../../actions/app.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit, AfterViewInit {
  @Select(AppState.getRequestParamsForRestaurantsSelector)
  searchParams$!: Observable<GetRestaurantsParams>;
  @Select(AppState.getRestaurantsSelector)
  restaurants$!: Observable<{
    restaurants: RestaurantDTO[];
    paginationMeta: PaginationMeta;
  }>;

  restaurants: RestaurantDTO[] = [];
  paginationMeta!: PaginationMeta;
  shouldShowLoader = false;
  searchParams!: GetRestaurantsParams;

  constructor(
    private restaurantService: RestaurantService,
    private loaderService: LoaderService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetRequestParamsForRestaurants());
    this.store.dispatch(new GetRestaurants());

    this.searchParams$.subscribe(returnData => {
      this.searchParams = returnData;
    });

    this.restaurants$.subscribe(returnData => {
      this.restaurants = returnData.restaurants;
      this.paginationMeta = returnData.paginationMeta;
    });

    if (!this.restaurants.length) {
      this.fetchRestaurants(this.searchParams);
    }
  }

  fetchRestaurants(params: GetRestaurantsParams) {
    this.restaurantService.getRestaurants(params).subscribe(response => {
      this.store.dispatch(new UpdateRestaurants(response.data, response.meta));
    });
  }

  onSearchChange = (params: GetRestaurantsParams) => {
    const newParams = {
      ...this.searchParams,
      ...params,
    };
    this.store.dispatch(new UpdateRequestParamsForRestaurants(newParams));
    this.fetchRestaurants(newParams);
  };

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      setTimeout(() => (this.shouldShowLoader = status), 100);
    });
  }
}

import { AfterViewInit, Component } from '@angular/core';
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
  UpdateRequestParamsForRestaurants,
} from '../../actions/app.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements AfterViewInit {
  @Select(AppState.selectStateData)
  searchParams$!: Observable<GetRestaurantsParams>;

  restaurants: RestaurantDTO[] = [];
  paginationMeta!: PaginationMeta;
  shouldShowLoader = false;
  searchParams!: GetRestaurantsParams;

  constructor(
    private service: RestaurantService,
    private loaderService: LoaderService,
    private store: Store
  ) {}

  ngOnInit() {
    this.fetchRestaurants(this.searchParams);
    this.store.dispatch(new GetRequestParamsForRestaurants());

    this.searchParams$.subscribe(returnData => {
      this.searchParams = returnData;
    });
  }

  fetchRestaurants(params: GetRestaurantsParams) {
    this.service.getRestaurants(params).subscribe(response => {
      this.restaurants = response.data;
      this.paginationMeta = response.meta;
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

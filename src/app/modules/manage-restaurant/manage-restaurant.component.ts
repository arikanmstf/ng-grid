import { AfterContentInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../../states/app.state';
import { Observable } from 'rxjs';
import {
  PaginationMeta,
  RestaurantDTO,
} from '../../services/restaurant.service';
import { GetRestaurants } from '../../actions/app.action';

@Component({
  selector: 'app-manage-restaurant',
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.scss'],
})
export class ManageRestaurantComponent implements AfterContentInit {
  @Select(AppState.getRestaurantsSelector)
  restaurants$!: Observable<{
    restaurants: RestaurantDTO[];
    paginationMeta: PaginationMeta;
  }>;

  restaurants: RestaurantDTO[] = [];
  restaurant: RestaurantDTO | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetRestaurants());
    this.restaurants$.subscribe(returnData => {
      this.restaurants = returnData.restaurants;
    });

    this.route.params.subscribe(({ restaurantId }) => {
      this.restaurant = this.restaurants.find(r => r.id === restaurantId);
    });
  }

  ngAfterContentInit() {
    // Navigates back when user tries to reach with direct link to the manage restaurant
    // With api support, this can be improved; For example: fetch single restaurant by id
    if (!this.restaurant) {
      this.onClickGoBack();
    }
  }

  onClickGoBack = () => {
    this.router.navigate(['']);
  };
}

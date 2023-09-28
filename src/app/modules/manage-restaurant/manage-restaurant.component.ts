import { AfterContentInit, AfterViewInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../../states/app.state';
import { Observable } from 'rxjs';
import {
  PaginationMeta,
  RestaurantDTO,
  RestaurantService,
} from '../../services/restaurant.service';
import { GetRestaurants } from '../../actions/app.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-manage-restaurant',
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.scss'],
})
export class ManageRestaurantComponent
  implements AfterViewInit, AfterContentInit
{
  @Select(AppState.getRestaurantsSelector)
  restaurants$!: Observable<{
    restaurants: RestaurantDTO[];
    paginationMeta: PaginationMeta;
  }>;

  restaurants: RestaurantDTO[] = [];
  restaurant: RestaurantDTO | undefined;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  shouldShowLoader = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private restaurantService: RestaurantService,
    private loaderService: LoaderService
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

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      setTimeout(() => (this.shouldShowLoader = status), 100);
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

  onSubmit() {
    if (this.restaurant && this.form.valid) {
      this.restaurantService
        .postManager(this.restaurant.id, {
          email: this.form.controls.email.value || '', // TS thinks value can be null, however it's not possible because there's form validation
          password: this.form.controls.password.value || '', // TS thinks value can be null, however it's not possible because there's form validation
        })
        .subscribe(observerOrNext => {
          console.log({ observerOrNext });
        });
    }
  }
}

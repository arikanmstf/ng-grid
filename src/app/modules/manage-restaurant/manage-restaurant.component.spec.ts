import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageRestaurantComponent } from './manage-restaurant.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule, Store } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';

import { AppState } from '../../states/app.state';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { RestaurantsMockService } from '../../test/restaurants-mock-service';
import { UpdateRestaurants } from '../../actions/app.action';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ManageRestaurantComponent', () => {
  let component: ManageRestaurantComponent;
  let fixture: ComponentFixture<ManageRestaurantComponent>;
  let store: Store;
  const mockResponse = RestaurantsMockService.getRestaurants();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RestaurantCardComponent,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        LoaderComponent,
        NgxsModule.forRoot([AppState]),
      ],
      declarations: [ManageRestaurantComponent],
      providers: [
        provideAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ restaurantId: mockResponse.data[0].id }),
          },
        },
      ],
    });
    store = TestBed.inject(Store);
    const route = TestBed.inject(ActivatedRoute);
    store.dispatch(new UpdateRestaurants(mockResponse.data, mockResponse.meta));

    fixture = TestBed.createComponent(ManageRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

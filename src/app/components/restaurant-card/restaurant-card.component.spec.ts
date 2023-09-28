import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCardComponent } from './restaurant-card.component';
import { RestaurantsMockService } from '../../test/restaurants-mock-service';

describe('RestaurantCardComponent', () => {
  let component: RestaurantCardComponent;
  let fixture: ComponentFixture<RestaurantCardComponent>;
  const mockResponse = RestaurantsMockService.getRestaurants();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RestaurantCardComponent],
    });
    fixture = TestBed.createComponent(RestaurantCardComponent);
    component = fixture.componentInstance;
    component.restaurant = mockResponse.data[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

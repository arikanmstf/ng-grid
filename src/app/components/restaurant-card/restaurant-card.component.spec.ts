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
  it('should render restaurant name', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toContain(
      component.restaurant.name
    );
  });
  it('should render restaurant address', () => {
    expect(
      fixture.nativeElement.querySelector('address').textContent
    ).toContain(component.restaurant.address.formattedAddress);
  });
});

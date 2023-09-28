import { TestBed } from '@angular/core/testing';

import { RestaurantResponse, RestaurantService } from './restaurant.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RestaurantsMockService } from '../test/restaurants-mock-service';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RestaurantService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call api correctly when getting restaurants', () => {
    const testData: RestaurantResponse =
      RestaurantsMockService.getRestaurants();
    const testUrl =
      'https://dev-api.fudy.eu/restaurants?page=2&take=5&status=ACTIVE';
    service
      .getRestaurants({ status: 'ACTIVE', take: 5, page: 2 })
      .subscribe(data => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should call api correctly when posting restaurant manager', () => {
    const testData = {};
    const restaurantId = 'restaurantId';
    const testUrl = `https://dev-api.fudy.eu/restaurants/${restaurantId}/manager`;

    service
      .postManager(restaurantId, {
        email: 'email@example.com',
        password: '123',
      })
      .subscribe(data => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.method).toEqual('POST');

    req.flush(testData);

    httpTestingController.verify();
  });
});

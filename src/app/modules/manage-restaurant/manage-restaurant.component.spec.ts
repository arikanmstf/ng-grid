import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
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
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { DebugElement } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';

describe('ManageRestaurantComponent', () => {
  let component: ManageRestaurantComponent;
  let fixture: ComponentFixture<ManageRestaurantComponent>;
  let store: Store;
  const mockResponse = RestaurantsMockService.getRestaurants();
  let service: RestaurantService;
  let httpTestingController: HttpTestingController;

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
        MatButtonModule,
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
    service = TestBed.inject(RestaurantService);
    httpTestingController = TestBed.inject(HttpTestingController);
    const route = TestBed.inject(ActivatedRoute);
    store.dispatch(new UpdateRestaurants(mockResponse.data, mockResponse.meta));

    fixture = TestBed.createComponent(ManageRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form', () => {
    expect(fixture.nativeElement.querySelectorAll('input').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('input')[0].placeholder).toBe(
      'Email address'
    );
    expect(fixture.nativeElement.querySelectorAll('input')[1].placeholder).toBe(
      'Password'
    );
  });

  describe('when submitting form', () => {
    let emailInput: DebugElement;
    let passwordInput: DebugElement;
    let button: DebugElement;

    beforeEach(() => {
      emailInput = fixture.debugElement.query(
        By.css('input[formcontrolname=email]')
      );
      passwordInput = fixture.debugElement.query(
        By.css('input[formcontrolname=password]')
      );
      button = fixture.debugElement.query(By.css('button[type=submit]'));
    });

    const triggerInputValueChange = (element: DebugElement, value: string) => {
      element.nativeElement.value = value;
      element.triggerEventHandler('input', {
        target: element.nativeElement,
      });
    };

    it('should show validation error when form is invalid', done => {
      triggerInputValueChange(emailInput, 'invalid_email');
      fixture.detectChanges();
      button.nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          fixture.nativeElement.querySelector(
            '.mat-mdc-form-field-error-wrapper'
          ).innerText
        ).toBe(' Please enter a valid email address');
        done();
      });
    });

    it('should call api when form is valid', done => {
      const email = 'valid@test.com';
      const password = 'password';
      triggerInputValueChange(emailInput, email);
      triggerInputValueChange(passwordInput, password);

      fixture.detectChanges();
      button.nativeElement.click();
      fixture.detectChanges();

      const testUrl = `https://dev-api.fudy.eu/restaurants/${component.restaurant?.id}/manager`;
      service.getRestaurants({ status: 'ACTIVE', take: 5, page: 2 });

      const req = httpTestingController.expectOne(testUrl);

      expect(req.request.body).toEqual({ email, password });

      expect(req.request.method).toEqual('POST');
      done();
    });
  });
});

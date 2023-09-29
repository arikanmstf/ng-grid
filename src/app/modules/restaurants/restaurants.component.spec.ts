import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsComponent } from './restaurants.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../states/app.state';
import { RestaurantsTableComponent } from '../../components/restaurants-table/restaurants-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { RestaurantsMockService } from '../../test/restaurants-mock-service';
import { UpdateRestaurants } from '../../actions/app.action';

describe('RestaurantsComponent', () => {
  let component: RestaurantsComponent;
  let fixture: ComponentFixture<RestaurantsComponent>;
  const mockResponse = RestaurantsMockService.getRestaurants();
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([AppState]),
        RestaurantsTableComponent,
        RouterTestingModule,
        MatTableModule,
      ],
      declarations: [RestaurantsComponent],
    });
    fixture = TestBed.createComponent(RestaurantsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    store.dispatch(new UpdateRestaurants(mockResponse.data, mockResponse.meta));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', done => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(
        component.restaurants.length
      );
      done();
    });
  });

  it('should show pagination correctly', done => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector(
          '.mat-mdc-paginator .mat-mdc-select-value'
        ).innerText
      ).toBe(`${component.paginationMeta.take}`);
      done();
    });
  });
});

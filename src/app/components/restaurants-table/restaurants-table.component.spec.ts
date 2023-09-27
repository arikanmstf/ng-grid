import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsTableComponent } from './restaurants-table.component';

describe('RestaurantsTableComponent', () => {
  let component: RestaurantsTableComponent;
  let fixture: ComponentFixture<RestaurantsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantsTableComponent],
    });
    fixture = TestBed.createComponent(RestaurantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
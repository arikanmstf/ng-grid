import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsTableComponent } from './restaurants-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RestaurantsTableComponent', () => {
  let component: RestaurantsTableComponent;
  let fixture: ComponentFixture<RestaurantsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RestaurantsTableComponent, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(RestaurantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

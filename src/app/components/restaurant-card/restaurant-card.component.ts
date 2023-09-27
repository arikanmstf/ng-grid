import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RestaurantDTO } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class RestaurantCardComponent {
  @Input() restaurant!: RestaurantDTO;
}

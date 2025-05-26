import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingStore, Flight, FlightFilter } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';
import { addDelay } from '../../util-flight/add-delay';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html'
})
export class FlightSearchComponent {
  protected store = inject(BookingStore);

  protected delay(flight: Flight): void {
    const newFlight = addDelay(flight);

    const flights = this.store.flights().map(
      flight => flight.id === newFlight.id ? newFlight : flight
    );

    this.store.setFlights(flights);
  }
}

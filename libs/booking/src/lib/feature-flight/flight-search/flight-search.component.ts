import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingStore, Flight, FlightFilter } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';


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

  protected search(filter: FlightFilter): void {
    this.store.setFilter(filter);
    this.store.loadFlights();
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    const flights = this.store.flights().map(
      flight => flight.id === newFlight.id ? newFlight : flight
    );

    this.store.setFlights(flights);
  }

  protected updateBasket(id: number, selected: boolean): void {
    this.store.updateBasket(id, selected);
  }

  protected reset(): void {
    this.store.setFlights([]);
  }
}

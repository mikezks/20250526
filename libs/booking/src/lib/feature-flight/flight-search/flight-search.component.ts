import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingStore, Flight } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';
import { addDelay } from '../../util-flight/add-delay';
import { injectDispatch } from '@ngrx/signals/events';
import { flightEvents } from '../../logic-flight/+state/signal-store/flight.events';


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
  protected flightEvents = injectDispatch(flightEvents);

  protected delay(flight: Flight): void {
    this.flightEvents.flightChanged(addDelay(flight));
  }
}

import { mapResponse, tapResponse } from '@ngrx/operators';
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { entityConfig, removeAllEntities, setAllEntities, setEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Flight } from '../../model/flight';
import { computed, inject } from '@angular/core';
import { FlightService } from '../../data-access/flight.service';
import { FlightFilter } from '../../model/flight-filter';
import { pipe, switchMap } from 'rxjs';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { flightEvents } from './flight.events';


type BookingState = {
  filter: FlightFilter;
  basket: Record<number, boolean>;
};

const initialBookingState: BookingState = {
  filter: {
    from: 'London',
    to: 'New York',
    urgent: false
  },
  basket: {
    3: true,
    5: true
  }
};

const flightConfig = entityConfig({
  entity: type<Flight>(),
  collection: 'flight',
  // selectId: flight => flight.id
});


export const BookingStore = signalStore(
  { providedIn: 'root' },
  // State
  withState(initialBookingState),
  withEntities(flightConfig),
  // Selectors: Derived State
  withComputed(store => ({
    delayedFlights: computed(
      () => store.flightEntities().filter(flight => flight.delayed)
    ),
  })),
  // Updaters
  withReducer(
    on(flightEvents.flightFilterChanged, ({ payload: filter }) => ({ filter })),
    on(flightEvents.flightsChanged, ({ payload: flights }) => setAllEntities(flights, flightConfig)),
    on(flightEvents.flightsReset, () => removeAllEntities(flightConfig)),
    on(flightEvents.flightChanged, ({ payload: flight }) => setEntity(flight, flightConfig)),
    on(flightEvents.basketChanged, ({ payload: basketUpdate }) => state => ({
        basket: {
          ...state.basket,
          [basketUpdate.id]: basketUpdate.selected
        }
      })),
  ),
  withEffects((
    store,
    events = inject(Events),
    flightService = inject(FlightService)
  ) => ({
    loadFlights$: events
      .on(flightEvents.flightFilterChanged)
      .pipe(
        switchMap(({ payload: filter }) => flightService.find(
          filter.from,
          filter.to,
          filter.urgent
        )),
        mapResponse({
          next: flights => flightEvents.flightsChanged(flights),
          error: err => console.error(err)
        })
      )
  }))
);
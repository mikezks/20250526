import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Flight } from '../../model/flight';
import { computed, inject } from '@angular/core';
import { FlightService } from '../../data-access/flight.service';
import { FlightFilter } from '../../model/flight-filter';


export const BookingStore = signalStore(
  { providedIn: 'root' },
  // State
  withState({
    filter: {
      from: 'London',
      to: 'New York',
      urgent: false
    },
    basket: {
      3: true,
      5: true
    } as Record<number, boolean>,
    flights: [] as Flight[]
  }),
  // Selectors: Derived State
  withComputed(store => ({
    delayedFlights: computed(
      () => store.flights().filter(flight => flight.delayed)
    ),
  })),
  // Updaters
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (flights: Flight[]) => patchState(store, { flights }),
    updateBasket: (id: number, selected: boolean) =>
      patchState(store, state => ({
        basket: {
          ...state.basket,
          [id]: selected
        }
      }))
  })),
  // Side-Effects
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    loadFlights: (filter: FlightFilter) => {
      flightService.find(
        filter.from,
        filter.to,
        filter.urgent
      ).subscribe(
        flights => store.setFlights(flights)
      )
    }
  }))
);
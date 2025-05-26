import { inject } from "@angular/core"
import { Store } from "@ngrx/store"
import { ticketActions } from "./redux/actions";
import { ticketFeature } from "./redux/reducer";
import { FlightFilter } from "../model/flight-filter";
import { Flight } from "../model/flight";


export function injectTicketsFacade() {
  const store = inject(Store);

  return {
    flights$: store.select(ticketFeature.selectFlights),
    search: (filter: FlightFilter) =>
      store.dispatch(ticketActions.flightsLoad(filter)),
    update: (flight: Flight) =>
      store.dispatch(ticketActions.flightUpdate({ flight })),
    reset: () =>
      store.dispatch(ticketActions.flightsClear())
  };
}

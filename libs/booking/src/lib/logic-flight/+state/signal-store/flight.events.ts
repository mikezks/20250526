import { eventGroup } from "@ngrx/signals/events";
import { FlightFilter } from "../../model/flight-filter";
import { type } from "@ngrx/signals";
import { Flight } from "../../model/flight";

export const flightEvents = eventGroup({
  source: 'Flight',
  events: {
    flightFilterChanged: type<FlightFilter>(),
    flightsChanged: type<Flight[]>(),
    flightsReset: type<void>(),
    flightChanged: type<Flight>(),
    basketChanged: type<{ id: number, selected: boolean }>(),
  }
});
import { Flight } from "../logic-flight";


export function addDelay(flight: Flight, delayInMin = 5): Flight {
  const flightDate = new Date(flight.date);
  const newDate = new Date(flightDate.getTime() + 1000 * 60 * delayInMin);

  return {
    ...flight,
    date: newDate.toISOString(),
    delayed: true
  };
}
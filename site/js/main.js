import stops from "../data/stops.js";
import { initializeStopMap, showStopsOnMap } from './stops-map.js';

let stopMap = initializeStopMap();
showStopsOnMap(stops, stopMap);

let routeCheckboxes = document.querySelectorAll(".route-checkbox");

for(const cb of routeCheckboxes){
    cb.addEventListener('change', ( ) => {
        console.log(cb.value);
    });
}

window.stops = stops;
window.routeCheckboxes = routeCheckboxes;

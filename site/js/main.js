import stops from "../data/stops.js";
import { showStopsInList } from './stops-list.js';
import { initializeStopMap, showStopsOnMap } from './stops-map.js';

let stopMap = initializeStopMap();
showStopsOnMap(stops, stopMap);

// Select the <ul> element with the id of stop-list
// so that, later, we can append <li> elements to it
let stopList = document.querySelector('#stop-list');
showStopsInList(stops, stopList);

// Select all the elements in the class of route-checkbox
let routeCheckboxes = document.querySelectorAll(".route-checkbox");

// Select what gets inputted into the input text box
let stopNameInput = document.querySelector('#stop-name-input');

// A function to filter stop everytime the text box gets input or when the checkboxes get checked
function getFilteredStops() {
    let filteredStops = stops;
    // First filter based on text box input
    const text = stopNameInput.value;
    filteredStops = stops.filter(function (stop) {
        const name = stop['stop_name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    // Then filter by checkbox selection
    for (const checkbox of routeCheckboxes) {
        if (checkbox.checked) {
            filteredStops = filteredStops.filter(function (stop) {
                const route = checkbox.value;
                const hasRoute = stop['routes_ids'].includes(route);
                return hasRoute;
            });
        }
    }

    return filteredStops;
}

for(const cb of routeCheckboxes){
    cb.addEventListener('change', ( ) => {
        const filteredStops = getFilteredStops();
        showStopsOnMap(filteredStops, stopMap);
        showStopsInList(filteredStops, stopList);
    });
}

stopNameInput.addEventListener('input', ( ) =>{
    const filteredStops = getFilteredStops();
    showStopsOnMap(filteredStops, stopMap);
    showStopsInList(filteredStops, stopList);
});

window.stops = stops;
window.routeCheckboxes = routeCheckboxes;
window.stopNameInput = stopNameInput;
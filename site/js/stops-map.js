import universityCity from "../data/universitycity.js";

function initializeStopMap() {
    let stopMap = L.map('stop-map').setView([39.95411565783252, -75.19304483522406], 14);
    //inside L.map() is the id of the container

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(stopMap); // inside addTo() is the js var for the map

    L.geoJSON(universityCity, {
        style: { fill: null, color:'black' },
    }).addTo(stopMap);

    return stopMap;
}

function makeStopFeature(stop){
    return{
        'type': "Feature",
        'id': stop['stop_id'],
        'properties': {
            'stop_name': stop['stop_name'],
            'routes_ids': stop['routes_ids'],
            'wheerchair_boarding': stop['wheelchair_boarding'],
        },
        'geometry': stop['geom'],
    };
}

function showStopsOnMap(stopsToShow, stopMap) {
    if(stopMap.stopLayers !== undefined) {
        stopMap.removeLayer(stopMap.stopLayers);
    }

    const stopFeatureCollection = {
        'type': 'FeatureCollection',
        'features': stopsToShow.map(makeStopFeature),
    };

    stopMap.stopLayers = L.geoJSON(stopFeatureCollection, {
        pointToLayer:(geoJsonPoint, latlng) => L.circleMarker(latlng),
        style:{
            stroke: null,
            fillOpacity: 0.9,
            radius: 3,
        },
        //Leaflet wraps a layer on every feature (stop) inside our feature collection
    }).bindTooltip(layer => layer.feature.properties['stop_name'])
    .addTo(stopMap);
}

export{
    initializeStopMap,
    showStopsOnMap,
};

window.initializeStopMap = initializeStopMap;
window.makeStopFeature = makeStopFeature;
window.showStopsOnMap = showStopsOnMap;
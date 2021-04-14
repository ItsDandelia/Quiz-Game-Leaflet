// Initialize leaflet.js
var L = require('leaflet');

// Initialize the map
const map = L.map('map',{zoom: 4.8}).setView([23.2599, 77.4126]);
map.setMinZoom(4.9);
map.setMaxZoom(4.9);

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(map);

L.geoJSON(india_geo, {style: {fillColor: '#000080', fillOpacity: 1, opacity: 1}}).addTo(map);

var values = city_data;
var random_city = values[parseInt(Math.random() * values.length)]
var random_city_lat = random_city.lat;
var random_city_lng = random_city.lng;
var random_city_name = random_city.city;
var random_city_state = random_city.admin_name;
console.log(random_city_name, random_city_state);
document.getElementById("city_state").innerHTML = String(random_city_name + ', ' + random_city_state);
var marker, newMarker, marker_id, newMarker_id;
// var random_city= null, random_city_lat = null, random_city_lng = null, random_city_name = null, random_city_state = null;
var history = [];
var flag=0;
function addMarker(e){
        flag += 1;
        // var tag = document.createElement('city_state');
        // var text = document.createTextNode('Hello');
        //var city = document.getElementByID('city_state');
        
        if (flag<6){
                console.log(flag);
                // random_city = values[parseInt(Math.random() * values.length)]
                // random_city_lat = random_city.lat;
                // random_city_lng = random_city.lng;
                // random_city_name = random_city.city;
                // random_city_state = random_city.admin_name;
                // console.log(random_city.city, random_city.admin_name);
                // document.getElementById("city_state").innerHTML = String(random_city_name + ',' + random_city_state);
                // document.getElementById("city_state").style.display = 'block';

        
        
                newMarker = L.marker(e.latlng);
                newMarker.addTo(map);
                newMarker_lat = e.latlng.lat;
                newMarker_lng = e.latlng.lng;
                //map.addLayer(newMarker);
                //newMarker.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
                //console.log(newMarker);
                newMarker_id = newMarker._leaflet_id;
                //newMarker_id = map.getLayerID(newMarker);
                
                //map.removeLayer(newMarker);
                //console.log(newMarker_latlng);
                
        
                var custom_marker = L.icon({
                        iconUrl: 'Marker-2.webp',
                        iconSize : [36,40],
                        iconAnchor: [19,38]
        
                })
        
                marker = L.marker([random_city_lat, random_city_lng],{icon: custom_marker});
                marker.addTo(map);
                marker_lat = random_city_lat;
                marker_lng = random_city_lng;
                //console.log(marker);
                marker_id = marker._leaflet_id;
                //console.log(marker_latlng);
                //map.addLayer(marker);
                
                var distance = Math.round(getDistance([newMarker_lat, newMarker_lng],[marker_lat, marker_lng])/1000); //converting to kilometers
                console.log(distance);
                history.push(
                        {
                        'city': random_city_name,
                        'state':random_city_state,
                        'distance':distance
                        }
                )
                console.log(history.length, history);
                if (flag<5){
                random_city = values[parseInt(Math.random() * values.length)]
                random_city_lat = random_city.lat;
                random_city_lng = random_city.lng;
                random_city_name = random_city.city;
                random_city_state = random_city.admin_name;
                console.log(random_city.city, random_city.admin_name);
                document.getElementById("city_state").innerHTML = String(random_city_name + ',' + random_city_state);
                document.getElementById("city_state").style.display = 'block';
                }
                else {
                        document.getElementById("text").style.display = 'none';
                        document.getElementById("view_score").style.display = 'block';
                        document.getElementById('view_score').innerHTML = 'View your score';
                }
              
                
        } 
        

        if (flag>5) {
                var distances = []
                for (var i=0; i<5; i++){
                        distances.push(history[i].distance);
                }
                min_distance = Math.min.apply(Math,distances);
                index = distances.indexOf(min_distance);

                console.log(history[index].city, history[index].state, history[index].distance);
                document.getElementById("view_score").innerHTML = String(history[index].city +  history[index].state + history[index].distance);
        }
        
        
        
        }
map.on('click', addMarker);
function getDistance(origin, destination) {
        // return distance in meters
        var lon1 = toRadian(origin[1]),
            lat1 = toRadian(origin[0]),
            lon2 = toRadian(destination[1]),
            lat2 = toRadian(destination[0]);
    
        var deltaLat = lat2 - lat1;
        var deltaLon = lon2 - lon1;
    
        var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var EARTH_RADIUS = 6371;
        return c * EARTH_RADIUS * 1000;
    }
function toRadian(degree) {
        return degree*Math.PI/180;
    }
//var distance = getDistance([lat1, lng1], [lat2, lng2])
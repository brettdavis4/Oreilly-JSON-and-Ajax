var map = null;

function findLocation(callback) {
	console.log("findLocation fired...");
	
	navigator.geolocation.getCurrentPosition(function(position) {
        getLocation(position);
    });
}

function getLocation(position) {

	console.log("getLocation fired...");
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
	console.log("lat: " + latitude);
	console.log("long: " + longitude);
	
    if (!map) {
        showMap(latitude, longitude);
    }
	addMarker(latitude, longitude);	
}

function showMap(lat, long) {	
    var googleLatLong = new google.maps.LatLng(lat, long);
    var mapOptions = {
        zoom: 12,
        center: googleLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    map.panTo(googleLatLong);
}

function addMarker(lat, long) {	
    var googleLatLong = new google.maps.LatLng(lat, long);
    var markerOptions = {
        position: googleLatLong,
        map: map,
        title: "Where I'm thinking today"
    }
    var marker = new google.maps.Marker(markerOptions);
}


function locationError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage += " " + error.message;
    }
    console.log(errorMessage);
    alert(errorMessage);
}

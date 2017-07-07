var request = require('request-promise');

function getIssPosition() {
  return request('http://api.open-notify.org/iss-now.json')
  .then(
    function(response) {
      // Parse as JSON
      //console.log(response);
      var issResObject = JSON.parse(response)
      var issLatLongObj = {};
      
      issLatLongObj.lat = issResObject.iss_position.latitude;
      issLatLongObj.lng = issResObject.iss_position.longitude;
      
      // Return object with lat and lng
      //console.log("The latitude is: " + issLatLongObj.lat + " & the longitude is: " + issLatLongObj.lng);
return issLatLongObj;
    }
  )
  
}

getIssPosition()
.catch(function(err){
    console.log(err, "iss error")
})

var address="2212 des Migrations, Montreal, Quebec";

function getAddressPosition(address) {

var key = 'AIzaSyCC0gdpgFjdOUEDcYnAKOeUwTdeG0wQxGg';
var geo_loc = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=" + key;

  return request(geo_loc)
  .then(
    function(response) {
      // Parse as JSON
      //console.log(response);
      var googleResponse = JSON.parse(response);
      var googleObj = {};
      
      googleObj.lat = googleResponse.results[0].geometry.location.lat;
      googleObj.lng = googleResponse.results[0].geometry.location.lng;
      
      //console.log("The latitude is: " + googleObj.lat + " & the longitude is: " + googleObj.lng);
      return googleObj
    }
  )
}
  
getAddressPosition(address)
.catch(function(err){
    console.log(err, "Google error")
})

// Complete the code of the function. The position parameter is an object with lat and lng.
// Make sure your function only returns a Promise for the current temperature (a number) and nothing else

function getCurrentTemperatureAtPosition(address) {

var latlng = 'https://api.darksky.net/forecast/ce049a5702c47003b68c6125f91c05a1/'+address.lat+','+address.lng;
//console.log(address, "address")
return request(latlng)
  .then(function(response) {
      // Parse as JSON
      var dsResponse = JSON.parse(response);
      var dsObj = {};
      
      dsObj.currTemp = dsResponse.currently.temperature;
     console.log("Current temp is: " + dsObj.currTemp);
     return dsObj;
    }
  )
}

getAddressPosition(address)
.then(function(latLng){
  getCurrentTemperatureAtPosition(latLng)
})
//.then(function(data){
  //then handle data
//})
.catch(function(err){
  console.log(err)
})

function getCurrentTemperature(address) {
  getAddressPosition(address)
.then(function(latLng){
  getCurrentTemperatureAtPosition(latLng)
})

}

getCurrentTemperature(address)

function getDistanceFromIss(address) {

}


// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

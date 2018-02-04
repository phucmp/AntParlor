// Profile Javascript File

var geocoder = new google.maps.Geocoder();
var address = "1038 Arroyo Drive, Irvine, CA 92617";
var latitude;
var longitude;

geocoder.geocode( { 'address': address}, function(results, status) {

if (status == google.maps.GeocoderStatus.OK) {
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.lng();
    initMap();
  }
});

function initMap() {
  var location = {lat: latitude, lng: longitude};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: location
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
} 

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

var pname ='CHAD LEI';
// Vue.js Code

var profileInfo = new Vue({
  el: '#providerInfo',
  data: {
    name: pname,
    address: '1038 Arroyo Drive, Irvine, CA 92617',
    number: '949.120.3569',
    service: 'Barber',
    summary: 'I am a fourth year student who studies computer science but have a passion for cutting hair',
    fblink: 'https://www.facebook.com/',
    iglink: 'https://www.instagram.com/',
    profilePic: 'tempprofile.png'
  }
})

var portfolio = new Vue({
  el: '#portfolioPics',
  data: {
    pic1: 'samp1.jpeg',
    pic2: 'samp2.jpg',
    pic3: 'samp3.png'
  }
})

/* 
// REVIEW SYSTEM

var rating = new Vue({
  el: '#rating',
  data: {
    emoji: '4.png',
    e1: '1.png',
    e2: '2.png',
    e3: '3.png',
    e4: '4.png',
    e5: '5.png'
  }
})
*/
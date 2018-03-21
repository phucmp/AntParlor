// Profile Javascript File


// Helper functions~~~~~~~~~~
function formatUsPhone(phone) {
    var phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);
    phone = phone.trim();
    var results = phoneTest.exec(phone);
    if (results !== null && results.length > 8) {
        return "(" + results[3] + ") " + results[4] + "-" + results[5] + (typeof results[8] !== "undefined" ? " x" + results[8] : "");
    } else {
         return phone;
    }
}

// Geolocation for Map~~~~~~~~~~
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


// Vue.js Code~~~~~~~~~~~
var portfolio = new Vue({
  el: '#portfolioPics',
  data: {
    pic1: 'samp1.jpeg',
    pic2: 'samp2.jpg',
    pic3: 'samp3.png'
  }
})


$(document).ready(function()
  {
    reqEmail = window.location.href.split("?")[1].split("=")[1];
    
    // AWS ~~~~~~~~~
    // Configure AWS SDK for JavaScript for LAMBDA
    AWS.config.region = 'us-west-2'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:01df0e0c-6be5-46cd-b277-f60d4e3021a0',
    });

    // Prepare to call Lambda function
    var lambda = new AWS.Lambda({region: 'us-west-1', apiVersion: '2015-03-31'});

    var pullParams = {
      FunctionName : 'accountInfo',
      InvocationType : 'RequestResponse',
      LogType : 'None',
      Payload: '{"email" : "' + reqEmail + '", "action" : "query"}'
    };

    var pullResults;

    lambda.invoke(pullParams, function(error, data) {
      if (error) {
        prompt(error);
      } else {
        pullResults = JSON.parse(data.Payload).Items[0];
        console.log(pullResults);
        var profileInfo = new Vue({
          el: '#providerInfo',
          data: {
            name: pullResults.name,
            address: pullResults.address,
            number: formatUsPhone(pullResults.phonenumber),
            service: pullResults.serviceType,
            profilePic: 'tempprofile.png'
          }
        })

        if (pullResults.dynamicAvailable == '1') {
          $('#settingAvailable').text('Yes');
          $('#settingAvailable').removeClass('label-danger');
          $('#settingAvailable').addClass('label-success');
        } else if (pullResults.dynamicAvailable == '0') {
          $('#settingAvailable').text('No');
          $('#settingAvailable').removeClass('label-success');
          $('#settingAvailable').addClass('label-danger');
        }
      }
    });
  }
);
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
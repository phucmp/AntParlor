var lat, lng, latlng,currentCity;
document.cookie = "professional"

// AWS ~~~~~~~~~
// Configure AWS SDK for JavaScript for LAMBDA
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:01df0e0c-6be5-46cd-b277-f60d4e3021a0',
});

// Prepare to call Lambda function
var lambda = new AWS.Lambda({region: 'us-west-1', apiVersion: '2015-03-31'});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
	lat = position.coords.latitude;
    lng = position.coords.longitude;
    latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
    console.log(latlng);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

function geocodeLatLng() {
	var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
               console.log(results[0].formatted_address);
               currentCity = results[0].address_components[2].long_name
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
}

function switchType(professional){
    if (professional == "professional"){
        document.cookie = "professional";
        
    }
    else if(professional == "amateur"){
        document.cookie = "amateur";

    }
}

function testPriceFunc(price,t){
    var professional = document.cookie;
    console.log(professional);
    if (currentCity == null){
        currentCity = "Irvine"
    }
    if (professional == 'professional' || professional == null){
        console.log('a');
        var pullParams = {
            FunctionName : 'priceRec',
            InvocationType : 'RequestResponse',
            LogType : 'None',
            Payload: '{"city" : "'+ currentCity +'", "action" : "query"}'
    
          };
    }
    if (professional == 'amateur'){
        console.log('b');
        var pullParams = {
            FunctionName : 'priceRecStudents',
            InvocationType : 'RequestResponse',
            LogType : 'None',
            Payload: '{"city" : "'+ currentCity +'", "action" : "query"}'
    
          };
    }

    lambda.invoke(pullParams, function(error, data) {
        if (error) {
          prompt(error);
        } else {
          pullResults = JSON.parse(data.Payload).Items;
          if(price == "$"){
            for (var key in pullResults) {
                if(pullResults[key].price == '$'){
                  console.log(pullResults[key]);
              }
          }
          }
          else if(price == "$$"){
            for (var key in pullResults) {
                if(pullResults[key].price == '$$'){
                  console.log(pullResults[key]);
              }
          }
          }
          else if(price == "$$$"){
            for (var key in pullResults) {
                if(pullResults[key].price == '$$$'){
                  console.log(pullResults[key]);
              }
          }

          }
          return pullResults;
    }
});
}
    

$( document ).ready(function() {
	getLocation();
	setTimeout(function(){ 
		console.log("here");
		geocodeLatLng(); 
	}, 10000);
});


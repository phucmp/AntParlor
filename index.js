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
var lambda1 = new AWS.Lambda({region: 'us-west-1', apiVersion: '2015-03-31'});

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
             //console.log(results[0].formatted_address);
             currentCity = results[0].address_components[2].long_name
      } else {
        //window.alert('No results found');
      }
    } else {
      //window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function switchType(professional){
    if (professional == "professional"){
        document.cookie = "professional";
        /*
        var profRec = {
            "Barber" : '',
            "BarberEmail": '',
            "Threading" : '',
            "ThreadingEmail": '',
            "Makeup" : '',
            "MakeupEmail": '',
            "Nails" : '',
            "NailsEmail": ''
        }

        var pullParams1 = {
          FunctionName : 'displayRec',
          InvocationType : 'RequestResponse',
          LogType : 'None',
          Payload: '{"city" : "Irvine", "type" : "prof"}'
        };

        var pullResults;

        lambda1.invoke(pullParams1, function(error, data) {
          if (error) {
            prompt(error);
          } else {
            pullResults = JSON.parse(data.Payload);
            console.log(pullResults.Items)
            for (var obj in pullResults.Items) {
              if (profRec.Barber == '') {
                  profRec.Barber = pullResults.Items[obj].name;
                  profRec.BarberEmail = pullResults.Items[obj].email;
              }
              else if (profRec.Threading == '') {
                  profRec.Threading = pullResults.Items[obj].name;
                  profRec.ThreadingEmail = pullResults.Items[obj].email;
              }
              else if (profRec.Nails == '') {
                  profRec.Nails = pullResults.Items[obj].name;
                  profRec.NailsEmail = pullResults.Items[obj].email;
              }
              else if (profRec.Makeup == '') {
                  profRec.Makeup = pullResults.Items[obj].name;
                  profRec.MakeupEmail = pullResults.Items[obj].email;
              }
            }

            var closestAvail = new Vue({
              el: '#closestAvail',
              data: {
                Barber: profRec.Barber,
                Threading: profRec.Threading,
                Nails: profRec.Nails,
                Makeup: profRec.Makeup,
                BarberEmail: profRec.BarberEmail,
                ThreadingEmail: profRec.ThreadingEmail,
                NailsEmail: profRec.NailsEmail,
                MakeupEmail: profRec.MakeupEmail
              }
            })
            console.log(closestAvail);
          }
        });*/
        
    }
    else if(professional == "amateur"){
        document.cookie = "amateur";

    }
}

function testFunction(){
    var pullParams ={
        FunctionName: 'topSearch',
        InvocationType: 'RequestResponse',
        LogType : 'None',
    }

    var bCount = 0;
    var nCount = 0;
    var mCount = 0;
    var tCount = 0;
    
    lambda.invoke(pullParams, function(error,data){
        if (error){
            prompt(error);
        }
        else{
            pullResults = JSON.parse(data.Payload).Items;
            for (var key in pullResults){
                if (pullResults[key].Service == "Barber"){
                    bCount += 1;
                }
                else if (pullResults[key].Service == "Threading"){
                    tCount += 1;
                }
                else if(pullResults[key].Service == "Makeup"){
                    mCount += 1;
                }
                else if(pullResults[key].Service == "Nails"){
                    nCount += 1;
                }                
            }


            var max = Math.max(bCount,tCount,mCount, nCount)
            var popularService;
           
            if (bCount == max){
                popularService = "Barber";
            }
            else if (tCount == max){
                popularService = "Threading";
            } 
            else if (mCount == max){
                popularService = "Makeup";
            }
            else if (nCount == max){
                popularService = "Nails";
            }

            pullPopular(popularService);

        }
    })
}
function pullPopular(popularService){
    var pullParams = {
        FunctionName: "priceRecStudents",
        InvocationType : "RequestResponse",
        LogType: "None",
        Payload: '{ "city" : "Irvine"}'
    };
    var popular = [];
    console.log(popularService);
    lambda.invoke(pullParams,function(error,data){
        if(error){
            promt(error);
        }
        else{
            pullResults = JSON.parse(data.Payload).Items;
            var count = 0;
            for (var key in pullResults){
                if (count == 6){
                    break;
                }
                if (pullResults[key].serviceType == popularService){
                    popular.push(pullResults[key]);
                    count += 1;
                }
            }
            console.log(popular);
            var closestAvail = new Vue({
              el: '#popRec',
              data: {
                one: popular[0].name,
                two: popular[1].name,
                three: popular[2].name,
                four: popular[3].name,
                five: popular[4].name,
                oneE: popular[0].email,
                twoE: popular[1].email,
                threeE: popular[2].email,
                fourE: popular[3].email,
                fiveE: popular[4].email
              }
            })
        }
    })
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

var amaRec = {
    "Barber" : '',
    "BarberEmail": '',
    "Threading" : '',
    "ThreadingEmail": '',
    "Makeup" : '',
    "MakeupEmail": '',
    "Nails" : '',
    "NailsEmail": ''
}

var pullParams1 = {
  FunctionName : 'displayRec',
  InvocationType : 'RequestResponse',
  LogType : 'None',
  Payload: '{"city" : "Irvine",  "type" : "ama"}'
};

var pullResults;

lambda1.invoke(pullParams1, function(error, data) {
  if (error) {
    prompt(error);
  } else {
    pullResults = JSON.parse(data.Payload);
    //console.log(pullResults);

    var geocoder = new google.maps.Geocoder();
    var address = "1040 Arroyo Dr, Irvine, CA 92617, USA";
    /*
    (function loop(i) {
    // got this from http://stackoverflow.com/a/28831613/4355695
      address = pullResults.Items[i].address;
      console.log(address);
      geocoder.geocode({ 'address': address }, function (results, status) {
      // got this from http://www.aspsnippets.com/Articles/Google-Maps-API-V3-Get-Latitude-and-Longitude-of-a-location-from-Address-using-JavaScript.aspx
        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          console.log(latitude + "," + longitude);
        }
      });
      i++;
      if (i < pullResults.Count)
      {
          setTimeout(function() { loop(i); }, 500);
      }
    })(0);*/

    for (var obj in pullResults.Items) {
        // Still need to rank by location
        // Adding in the dynamic available check for 1
        /*console.log(pullResults.Items[obj].address);
        geocoder.geocode( { 'address': pullResults.Items[obj].address}, function(results, status) {
        
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude);
          } 
        }); */
        if (pullResults.Items[obj].dynamicAvailable) {
          if (pullResults.Items[obj].serviceType == 'Barber' && amaRec.Barber == '') {
              amaRec.Barber = pullResults.Items[obj].name;
              amaRec.BarberEmail = pullResults.Items[obj].email;
          }
          if (pullResults.Items[obj].serviceType == 'Threading' && amaRec.Threading == '') {
              amaRec.Threading = pullResults.Items[obj].name;
              amaRec.ThreadingEmail = pullResults.Items[obj].email;
          }
          if (pullResults.Items[obj].serviceType == 'Nails' && amaRec.Nails == '') {
              amaRec.Nails = pullResults.Items[obj].name;
              amaRec.NailsEmail = pullResults.Items[obj].email;
          }
          if (pullResults.Items[obj].serviceType == 'Makeup' && amaRec.Makeup == '') {
              amaRec.Makeup = pullResults.Items[obj].name;
              amaRec.MakeupEmail = pullResults.Items[obj].email;
          }
        }
    }
    var closestAvail = new Vue({
      el: '#closestAvail',
      data: {
        Barber: amaRec.Barber,
        Threading: amaRec.Threading,
        Nails: amaRec.Nails,
        Makeup: amaRec.Makeup,
        BarberEmail: amaRec.BarberEmail,
        ThreadingEmail: amaRec.ThreadingEmail,
        NailsEmail: amaRec.NailsEmail,
        MakeupEmail: amaRec.MakeupEmail
      }
    })
  }
});

$('#loginSubmit').click(function(e)
  {
    e.preventDefault();
    console.log($('#loginEmail')[0].value);
    console.log($('#loginPw')[0].value);

    if ($('#loginEmail')[0].value == '') {
      alert("Please Enter an Email");
    } else if ($('#loginPw')[0].value == '') {
      alert("Please Enter a Password");
    } else {
    
      pullParams = {
        FunctionName : 'emailMatch',
        InvocationType : 'RequestResponse',
        LogType : 'None',
        Payload: JSON.stringify({"email" : $('#loginEmail')[0].value, "password" : $('#loginPw')[0].value})
      }

      lambda.invoke(pullParams, function(error, data) {
        if (error) {
          prompt(error);
        } else {
          pullResults = JSON.parse(data.Payload);
          console.log(pullResults);
          if (pullResults == "success") {
            var url = 'myaccount.html?email=' + $('#loginEmail')[0].value;
            document.location.href = url;
          } else {
            alert("The Email Or Password That You Have Entered Is Incorrect. Please Try Again.");
          }
        }
      });
      
    }
  });  


$( document ).ready(function() {
  testFunction();
	getLocation();
	setTimeout(function(){ 
		geocodeLatLng(); 
	}, 10000);
  //console.log(getDistance(33.6464991, -117.8262621, 33.5, -117.5));
});


// My Account JavaScript File

// VUE~~~~~~~~~~~
var info = new Vue({
  el: '#profile',
  data: {
    name: 'Chad Lei',
    email: 'chadlei@uci.edu',
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

// AWS ~~~~~~~~~
// Configure AWS SDK for JavaScript
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:01df0e0c-6be5-46cd-b277-f60d4e3021a0',
});

// Prepare to call Lambda function
var lambda = new AWS.Lambda({region: 'us-west-1', apiVersion: '2015-03-31'});

var pullParams = {
  FunctionName : 'priceRec',
  InvocationType : 'RequestResponse',
  LogType : 'None',
  Payload: '{"city" : "Irvine", "recommendation" : "price"}'
};

var pullResults;

lambda.invoke(pullParams, function(error, data) {
  if (error) {
    prompt(error);
  } else {
    console.log(data.Payload);
    pullResults = JSON.parse(data.Payload);
  }
});

console.log(pullResults);
/*

function pullHandle() {
  if (isSpinning == false) {
     // Show the handle pulled down
     slot_handle.src = "lever-dn.png";
  }
}

function initiatePull() {
  // Show the handle flipping back up
  slot_handle.src = "lever-up.png"; 
  // Set all three wheels "spinning"
  slot_L.src = "slotpullanimation.gif";
  slot_M.src = "slotpullanimation.gif";
  slot_R.src = "slotpullanimation.gif";
  // Set app status to spinning
  isSpinning = true;
  // Call the Lambda function to collect the spin results
  lambda.invoke(pullParams, function(err, data) {
     if (err) {
        prompt(err);
     } else {
        pullResults = JSON.parse(data.Payload);
        displayPull();
     }
  }); 
}

 function displayPull() {
    isSpinning = false;
    if (pullResults.isWinner) {
       winner_light.visibility = visible;
    }
    $("#slot_L").delay(4000).attr("src", pullResults.leftWheelImage.file.S);
    $("#slot_M").delay(6500).attr("src", pullResults.midWheelImage.file.S);
    $("#slot_R").delay(9000).attr("src", pullResults.rightWheelImage.file.S);
 }
 */



$(document).ready(function()
  {
    var navItems = $('.admin-menu li > a');
    var navListItems = $('.admin-menu li');
    var allWells = $('.admin-content');
    var allWellsExceptFirst = $('.admin-content:not(:first)');
    allWellsExceptFirst.hide();

    navItems.click(function(e)
    {
      e.preventDefault();
      navListItems.removeClass('active');
      $(this).closest('li').addClass('active');
      allWells.hide();
      var target = $(this).attr('data-target-id');
      $('#' + target).show();
    });

    $('#available').click(function(e)
    {
      e.preventDefault();
      $('#settingAvailable').text('Yes');
      $('#settingAvailable').removeClass('label-danger');
      $('#settingAvailable').addClass('label-success');
      allWells.hide();
      navListItems.removeClass('active');
      $('#liSettings').addClass('active');
      $('#settings').show();
    }); 

    $('#notAvailable').click(function(e)
    {
      e.preventDefault();
      $('#settingAvailable').text('No');
      $('#settingAvailable').removeClass('label-success');
      $('#settingAvailable').addClass('label-danger');
      allWells.hide();
      navListItems.removeClass('active');
      $('#liSettings').addClass('active');
      $('#settings').show();
    });  
  }
);
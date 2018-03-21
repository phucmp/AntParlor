// My Account JavaScript File
var accountName, accountEmail;

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
  Payload: '{"name" : "Vegeta", "action" : "query"}'
};

var pullResults;

lambda.invoke(pullParams, function(error, data) {
  if (error) {
    prompt(error);
  } else {
    pullResults = JSON.parse(data.Payload).Items[0];
    console.log(pullResults);
    var info = new Vue({
      el: '#profile',
      data: {
        name: pullResults.name,
        email: pullResults.email,
        address: pullResults.address,
        number: pullResults.phonenumber,
        service: pullResults.serviceType,
      }
    })

    accountName = info._data.name;
    accountEmail = info._data.email;

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




// VUE~~~~~~~~~~~


var portfolio = new Vue({
  el: '#portfolioPics',
  data: {
    pic1: 'samp1.jpeg',
    pic2: 'samp2.jpg',
    pic3: 'samp3.png'
  }
})



// JS Helper Functions~~~~~~~~~~~~
function updatePW() {
  var new_pw = document.getElementById("new_password").value;
  var confirm_pw = document.getElementById("confirm_password").value;
  if(new_pw != confirm_pw) {
    alert("Your password does not match. Please try again.");
    document.getElementById("new_password").value = '';
    document.getElementById("confirm_password").value = '';
  } else {
    pullParams = {
      FunctionName : 'accountInfo',
      InvocationType : 'RequestResponse',
      LogType : 'None',
      Payload: JSON.stringify({"email" : accountEmail, "action" : "password", "password" : new_pw})
    }

    lambda.invoke(pullParams, function(error, data) {
      if (error) {
        prompt(error);
      } else {
        pullResults = JSON.parse(data.Payload);
      }
    });

    document.getElementById("new_password").value = '';
    document.getElementById("confirm_password").value = '';

    alert("Password has been updated successfully.");
  }
}

function updateInfo() {
  var new_name = document.getElementById("new_name").value;
  var new_email = document.getElementById("new_email").value;
  var new_number = document.getElementById("new_number").value;
  var new_address = document.getElementById("new_address").value;
  var new_service = document.getElementById("new_service").value;
  var counter = 0;
  var updateThis, change;

  if (new_name != '') {
    counter += 1;
    updateThis = "new_name";
    change = new_name;
  }
  if (new_email != '') {
    counter += 1;
    updateThis = "new_email";
    change = new_email;
  }
  if (new_number != '') {
    counter += 1;
    updateThis = "new_number";
    change = new_number;
  }
  if (new_address != '') {
    counter += 1;
    updateThis = "new_address";
    change = new_address;
  }
  if (new_service != '') {
    counter += 1;
    updateThis = "new_service";
    change = new_service;
  }

  if (counter == 0) {
    alert("You have not changed any field.");
  } else if (counter > 1) {
    alert("Please only update one field at a time.");
    document.getElementById("new_name").value = '';
    document.getElementById("new_email").value = '';
    document.getElementById("new_number").value = '';
    document.getElementById("new_address").value = '';
    document.getElementById("new_service").value = '';
  } else {
    pullParams = {
      FunctionName : 'accountInfo',
      InvocationType : 'RequestResponse',
      LogType : 'None',
      Payload: JSON.stringify({"email" : accountEmail, "action" : updateThis, "change" : change})
    }

    lambda.invoke(pullParams, function(error, data) {
      if (error) {
        prompt(error);
      } else {
        pullResults = JSON.parse(data.Payload);
        document.getElementById(updateThis).value = '';
        alert("Your account has been updated. Please refresh page to see the change.");
      }
    });
  }
}


// Execute once page loads ~~~~~~~~~
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

      pullParams = {
        FunctionName : 'accountInfo',
        InvocationType : 'RequestResponse',
        LogType : 'None',
        Payload: JSON.stringify({"email" : accountEmail, "action" : "dynamic", "avail" : "1"})
      }

      lambda.invoke(pullParams, function(error, data) {
        if (error) {
          prompt(error);
        } else {
          pullResults = JSON.parse(data.Payload);
          console.log(pullResults);
        }
      });
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

      pullParams = {
        FunctionName : 'accountInfo',
        InvocationType : 'RequestResponse',
        LogType : 'None',
        Payload: JSON.stringify({"email" : accountEmail, "action" : "dynamic", "avail" : "0"})
      }

      lambda.invoke(pullParams, function(error, data) {
        if (error) {
          prompt(error);
        } else {
          pullResults = JSON.parse(data.Payload);
          console.log(pullResults);
        }
      });
    });  
  }
);
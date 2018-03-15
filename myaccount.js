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

    //check to string to int
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
        Payload: JSON.stringify({"email" : accountEmail, "action" : "update", "avail" : "1"})
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
        Payload: JSON.stringify({"email" : accountEmail, "action" : "update", "avail" : "0"})
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
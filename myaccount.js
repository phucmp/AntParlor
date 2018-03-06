// My Account JavaScript File

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
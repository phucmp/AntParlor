// var fakeNav = new Vue({
//   el: '#fake-nav',
//   data: {
//     message: 'Hello Vue.js!'
//   }
// })

var nav = new Vue({  
	el: '#fake-nav',
	methods: {
		open: function(which, e) {
			// alert("hello")
			// $('#login-modal').addClass('active');
			
			console.log(document.getElementsByClassName('user-modal-container'));
			// document.getElementsByClassName('user-modal-container')[0].style.visibility='visible';
			// document.getElementsByClassName('user-modal-container')[0].style.opacity='1';
			// Same thing using Jquery
			$(".user-modal-container").css({"visibility":"visible","opacity":1});

		}
	}
});

// var modal = new Vue({  
// 	el: '#login-modal',
// 	methods: {
// 		close: function(e) {
// 	  		e.preventDefault();
// 	  		$('#login-modal').removeClass('active');
// 		}
// 	}
// });
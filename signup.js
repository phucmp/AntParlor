var nav = new Vue({  
	el: '#fake-nav',
	methods: {
		open: function(which, e) {
			// $("#login-modal").addClass('active');

			// User to test
			// console.log(document.getElementsByClassName('user-modal-container'));
			
			// Javascript
			// document.getElementsByClassName('user-modal-container')[0].style.visibility='visible';
			// document.getElementsByClassName('user-modal-container')[0].style.opacity='1';
			
			// Same thing in Jquery
			// $(".user-modal-container").css({"visibility":"visible","opacity":1});

			if (modal.active !== null) {
				$('#form-'+modal.active).removeClass('active');
				$('#'+modal.active+'-form').removeClass('active');
			}

			$('#login-modal').addClass('active');
			$('#form-'+which).addClass('active');
			$('#'+which+'-form').addClass('active');
			modal.active = which;
		}
	}
});

var modal_submit_register = 'Register';
var modal_submit_password = 'Reset Password';
var modal_submit_login = 'Login';

var modal = new Vue({  
	el: '#login-modal',
	data: {
		active: null,

		// Submit button text
        registerSubmit: modal_submit_register,
        passwordSubmit: modal_submit_password,
        loginSubmit: modal_submit_login,

        // Modal text fields
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        loginUser: '',
        loginPassword: '',
        passwordEmail: '',

        // Modal error messages
        registerError: '',
        loginError: '',
        passwordError: '',
	},
	methods: {
		close: function(e) {  
  			e.preventDefault();
  			if (e.target === this.$el) {
    			$('#login-modal').removeClass('active');
  			}
  		},

  		flip: function(which, e) {  
			e.preventDefault();
			if (which !== this.active) {
				$('#form-' + this.active).removeClass('active');
				$('#form-' + which).addClass('active');
				$('#'+which+'-form').addClass('active');
				$('#'+this.active+'-form').removeClass('active');

				this.active = which;
			}
		},
	}
});


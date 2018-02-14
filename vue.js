var nav = new Vue({  
	el: '#fake-nav',
	methods: {
		open: function(which, e) {
			// Prevents clicking the link from doing anything
			e.preventDefault();
			$('#login-modal').addClass('active');
		}
	}
});
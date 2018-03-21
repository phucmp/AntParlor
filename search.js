

// What The User Searched
var searchWord = window.location.search.substr(1).split("=")[1];

// List of All Keywords For Possible Queries
var barber = [
	'barber','barbers','barbershop','barbers near me','hair','haircut','hair cut','cut','cuts','fade', 'fades', 'designs','fix up'
];

var nails = [
	'nails', 'nail', 'manicure', 'pedicure', 'gel', 'gel manicure', 'coating', 'coat', 'acrylic'
];

var threading = [
	'threading', 'eyebrow', 'eyebrows', 'eyebrow plucking', 'plucking', 'eyebrow threading', 'waxing', 'wax', 'eyebrow waxing'
];

var makeup = [
	'makeup', 'eye shadow'
];

var salon = [
	'salon', 'hair salon', 'barbershop', 'hairdo'
];

var names = [ 
	'bob','bill','linda','tina','gene','louise'
];

var locations = [
	'irvine','uci','costa mesa','santa ana','newport'
];

// AWS ~~~~~~~~~
// Configure AWS SDK for JavaScript
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:01df0e0c-6be5-46cd-b277-f60d4e3021a0',
});

// Prepare to call Lambda function
var lambda = new AWS.Lambda({region: 'us-west-1', apiVersion: '2015-03-31'});

var pullParams = {};

// var pullParams = {
//   FunctionName : 'searchResults',
//   InvocationType : 'RequestResponse',
//   LogType : 'None',
//   // Payload: '{"serviceType" : "Barber"}'
//   Payload: '{"serviceType" : "' + window.location.search.substr(1).split("=")[1] + '"}'
// };


if (barber.includes(searchWord.toLowerCase())) { 
	pullParams = {
	  FunctionName : 'searchResults',
	  InvocationType : 'RequestResponse',
	  LogType : 'None',
	  Payload: '{"serviceType" : "Barber"}'
	};
} else if (nails.includes(searchWord.toLowerCase())) {
	pullParams = {
	  FunctionName : 'searchResults',
	  InvocationType : 'RequestResponse',
	  LogType : 'None',
	  Payload: '{"serviceType" : "Nails"}'
	};
} else if (threading.includes(searchWord.toLowerCase())) {
	pullParams = {
	  FunctionName : 'searchResults',
	  InvocationType : 'RequestResponse',
	  LogType : 'None',
	  Payload: '{"serviceType" : "Threading"}'
	};
} else if (makeup.includes(searchWord.toLowerCase())) {
	pullParams = {
	  FunctionName : 'searchResults',
	  InvocationType : 'RequestResponse',
	  LogType : 'None',
	  Payload: '{"serviceType" : "Makeup"}'
	};
} else if (salon.includes(searchWord.toLowerCase())) {
	pullParams = {
	  FunctionName : 'searchResults',
	  InvocationType : 'RequestResponse',
	  LogType : 'None',
	  Payload: '{"serviceType" : "Salon"}'
	};
} else {
	pullParams = {
	  FunctionName : 'searchResults',
	  InvocationType : 'RequestResponse',
	  LogType : 'None',
	  Payload: '{"serviceType" : "Barber"}'
	};
}

var pullResults;

// lambda.invoke(pullParams, function(error, data) {
//   if (error) {
//     prompt(error);
//   } else {
//     // console.log(data.Payload);
//     // pullResults = JSON.parse(data.Payload);
//     pullResults = JSON.parse(data.Payload).Items;
//     console.log(pullResults);
//   }
// });

// console.log(pullResults);

lambda.invoke(pullParams, function(error, data) {
  if (error) {
    prompt(error);
  } else {
    // console.log(data.Payload);
    // pullResults = JSON.parse(data.Payload);
    pullResults = JSON.parse(data.Payload).Items;
    console.log(pullResults);
	const vm2 = new Vue({
	  el: '#app',
	  data: {
	  	search: '',
	  	search_term: window.location.search.substr(1).split("=")[1],
	  	// updated_search_term: this.parseSearchTerm,
	  // 	Providers:[
			// {name: "Bob", skill: "barber", location:"irvine"},
			// {name: "Bill", skill: "barber", location:"costa mesa"},
			// {name: "Linda", skill: "makeup", location:"santa ana" },
			// {name: "Tina", skill: "nail", location:"newport" },
			// {name: "Gene", skill: "eyebrow", location:"uci" },
			// {name: "Louise", skill: "other", location:"uci" }
	  // 	]
	  	Providers: pullResults,
	  },
	  // methods: {
	  // 	parseSearchTerm: function () {
	  // 		if (this.search_term.includes("+")){
	  // 			var newTerm = '';
	  // 			var splitted = this.search_term.split("+");
	  // 			for (var i = 0; i < splitted.length; i++) { 
	  // 				newTerm += splitted[i];
	  // 			}
	  // 			return newTerm;
	  // 			console.log( "HELLO");
	  // 		} else {
	  // 			console.log( "HELLO2");
	  // 			return this.search_term;
	  // 		}
	  // 	}
	  // },
	  computed: {
	  	filteredData: function(){
	  		if (barber.includes(this.search_term.toLowerCase())){
	  			return this.Providers.filter((provider) => {
	  				return provider.serviceType.toLowerCase().match('barber');
	  			})
	  		} else if (nails.includes(this.search_term.toLowerCase())){
	  			return this.Providers.filter((provider) => {
	  				return provider.serviceType.toLowerCase().match('nails');
	  			})
	  		} else if (threading.includes(this.search_term.toLowerCase())){
	  			return this.Providers.filter((provider) => {
	  				return provider.serviceType.toLowerCase().match('threading');
	  			})
	  		} else if (makeup.includes(this.search_term.toLowerCase())){
	  			return this.Providers.filter((provider) => {
	  				return provider.serviceType.toLowerCase().match('makeup');
	  			})
	  		} else if (salon.includes(this.search_term.toLowerCase())){
	  			return this.Providers.filter((provider) => {
	  				return provider.serviceType.toLowerCase().match('salon');
	  			})
	  		} else if (names.includes(this.search_term.toLowerCase())){
	  			return this.Providers.filter((provider) => {
	  				return provider.name.toLowerCase().match(this.search_term.toLowerCase());
	  			})
	  		} else if (locations.includes(this.search_term.toLowerCase())){
	  			return this.Providers.filter((provider) => {
	  				return provider.location.toLowerCase().match(this.search_term.toLowerCase());
	  			})
	  		} else {
	  			return this.Providers.filter((provider) => {
	  				return provider.city.match('Irvine');
	  			})
	  		}
	  		// return this.Providers.filter((provider) => {
	  		// 	// return provider.name.toLowerCase().match(this.search.toLowerCase());
	  		// 	return provider.skill.toLowerCase().match(this.search_term.toLowerCase());
	  		// });
	  	}
	  }

	});
    }
});

function testJS() {
	console.log(document.getElementById('name').value);
    var b = document.getElementById('name').value,
        url = 'profile.html?name=' + encodeURIComponent(b);

    document.location.href = url;
}






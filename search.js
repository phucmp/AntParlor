
// const vm = new Vue({
//   el: '#search_results',
//   data: {
//   	search_term: 'Results: "Haircut"',
//     results: [
//       {name: "john adams", price: "$15", number: "4158881111", reviews: "5"},
//       {name: "chad lei", price: "$11", number: "4158881111", reviews: "5"},
//       {name: "paul pham", price: "$14", number: "4158881111", reiews: "5"},
//       {name: "jack jack", price: "$12", number: "4158881111", reviews: "5"}
//     ]
//   }
// });

// AWS ~~~~~~~~~
// Configure AWS SDK for JavaScript
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:01df0e0c-6be5-46cd-b277-f60d4e3021a0',
});

// Prepare to call Lambda function
var lambda = new AWS.Lambda({region: 'us-west-1', apiVersion: '2015-03-31'});

var pullParams = {
  FunctionName : 'searchResults',
  InvocationType : 'RequestResponse',
  LogType : 'None',
  Payload: '{"serviceType" : "Barber"}'
};

var pullResults;

lambda.invoke(pullParams, function(error, data) {
  if (error) {
    prompt(error);
  } else {
    // console.log(data.Payload);
    // pullResults = JSON.parse(data.Payload);
    pullResults = JSON.parse(data.Payload).Items;
    console.log(pullResults);
  }
});

// console.log(pullResults);

// create list for barber (and all different types of services)

// var barber = [
// 	{key: 'barber'},
// 	{key: 'barbers'},
// 	{key: 'barbershop'},
// 	{key: 'barbers near me'},
// 	{key: 'hair'},
// 	{key: 'haircut'},
// 	{key: 'cut'},
// 	{key: 'cuts'},
// 	{key: 'fade'},
// 	{key: 'designs'},
// 	{key: 'fix up'}
// ];

var barber = [
	'barber','barbers','barbershop','barbers near me','hair','haircut','hair cut','cut','cuts','fade','designs','fix up'
];

var names = [ 
	'bob','bill','linda','tina','gene','louise'
];

var locations = [
	'irvine','uci','costa mesa','santa ana','newport'
];

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
  	Providers: [for(item in pullResults)]
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
  		// if search is in names, return 
  		// if search is in locations, return 
  		// if search is in services, return 
  		// if search is in prices, return
  		// if (this.search in barber) {
  		// if (barber.indexOf(this.search) >= 0){
  		// 	return provider.skill.toLowerCase().match(this.search_term.toLowerCase());
  		// }
  		if (barber.includes(this.search_term)){
  			// console.log( "HELLO");
  			return this.Providers.filter((provider) => {
  				return provider.skill.toLowerCase().match('barber');
  			})
  		} else if (names.includes(this.search_term)){
  			// console.log( "HELLO");
  			return this.Providers.filter((provider) => {
  				return provider.name.toLowerCase().match(this.search_term.toLowerCase());
  			})
  		} else if (locations.includes(this.search_term)){
  			// console.log( "HELLO");
  			return this.Providers.filter((provider) => {
  				return provider.location.toLowerCase().match(this.search_term.toLowerCase());
  			})
  		}
  		// return this.Providers.filter((provider) => {
  		// 	// return provider.name.toLowerCase().match(this.search.toLowerCase());
  		// 	return provider.skill.toLowerCase().match(this.search_term.toLowerCase());
  		// });
  	}
  }

});





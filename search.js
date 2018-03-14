
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

// create list for barber (and all different types of services)

var names = [
    {name: 'johnny'},
    {name: 'jack'},
    {name: 'selina'}
];

var services = [
    {service: 'barber'},
    {service: 'makeup'},
    {service: 'nails'}
];

var locations = [
	{location: 'irvine'},
	{location: 'uci'},
	{location: 'costa mesa'}

];

const vm2 = new Vue({
  el: '#app',
  data: {
  	search: '',
  	Providers:[
		{name: "Bob", skill: "barber"},
		{name: "Linda", skill: "makeup" },
		{name: "Tina", skill: "nail" },
		{name: "Gene", skill: "eyebrow" },
		{name: "Louise", skill: "other" }
  	]
  },
  computed: {
  	filteredData: function(){
  		// if search is in names, return 
  		// if search is in locations, return 
  		// if search is in services, return 
  		// if search is in prices, return
  		return this.Providers.filter((provider) => {
  			return provider.name.toLowerCase().match(this.search.toLowerCase());
  		});
  	}
  }

});





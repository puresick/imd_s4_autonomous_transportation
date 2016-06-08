var numberOfBusses 	= process.argv[2];

if(numberOfBusses === undefined) numberOfBusses = 1;

var faker 			= require("faker");
var randomstring 		= require("randomstring");
var mongoose 		= require('mongoose');


console.log("generator-busses.js");
if( numberOfBusses != 1 )
	console.log("now creating " + numberOfBusses + " dummy busses");
else
	console.log("now creating " + numberOfBusses + " dummy busses");



mongoose.connect('mongodb://localhost/atbusphere');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	console.log("mongodb connection established :)")
	var busSchema = mongoose.Schema({
    		name: String,
		capacity: Number,
		nextCheck: Date,
		lastLocation: Array,
		lastStatus: String
	});
	var busmodel = mongoose.model('busses', busSchema);

	for(var i = 0; i < numberOfBusses; i++){

		//	generate busdata
			var statuses 		= [ "repair", "charging", "transporting", "free" ];
			var firstname 		= faker.name.firstName();
			var lastname		= faker.name.lastName();
			var name 			= firstname.toLowerCase() + lastname.toLowerCase();
			var capacity		= Math.round(Math.random() * 10);
			if (capacity < 6) 	capacity = 6;

			var bus = {};

			bus.name 			= name;
			bus.nextCheck 		= faker.date.future(2, new Date());
			bus.capacity 		= capacity;
			bus.lastLocation 		= [ faker.address.latitude(), faker.address.longitude() ];
			bus.lastStatus 		= statuses[Math.round(Math.random() * (statuses.length-1))];


		//	save data to db
			var businsert = new busmodel( bus );
			businsert.save(function (err, businsert) {
		  		if (err) return console.error(err);
			});

	}


});

/*





}
*/

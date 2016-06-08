var numberOfClubs 	= process.argv[2];

if(numberOfClubs === undefined) numberOfClubs = 1;

var faker 			= require("faker");
var randomstring 		= require("randomstring");
var mongoose 		= require('mongoose');


console.log("generator-clubs.js");
if( numberOfClubs != 1 )
	console.log("now creating " + numberOfClubs + " dummy clubs");
else
	console.log("now creating " + numberOfClubs + " dummy club");



mongoose.connect('mongodb://localhost/atbusphere');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	console.log("mongodb connection established :)")
	var clubSchema = mongoose.Schema({
    		name: String,
		address: String,
		maxNumberOfPeople: Number,
		currentNumberOfPeople: Number,
		openingAt: String,
		closingAt: String,
		videoFileFolder: String,
		playlistID: Number,
	});
	var clubmodel = mongoose.model('clubs', clubSchema);

	var firstnames 		= [ "Big", "Mega", "Super", "Duper", "Ultra", "Bunkerbusting", "Hard", "Extreme", "XTRM", "Lost" ];
	var lastnames 		= [ "Moon", "Sun", "Jupiter", "Mars", "Mercur", "Venus", "Earth", "Pluto", "Saturn" ];

	var openhours 		= [ "21:00", "22:00", "22:30", "23:00", "23:30", "00:00" ];
	var closehours 		= [ "2:00", "2:30", "3:00", "3:30", "4:00", "5:00" ];


	for(var i = 0; i < numberOfClubs; i++){

		//	generate clubdata
			var firstname 		= firstnames[Math.round(Math.random() * (firstnames.length-1))];
			var lastname 		= lastnames[Math.round(Math.random() * (lastnames.length-1))];
			var name 			= firstname + " " + lastname;

			var maxNumberOfPeople 	= Math.round(Math.random()*1200);
			var currentNumberOfPeople = Math.round(Math.random()*maxNumberOfPeople);

			var opensAt 		= openhours[Math.round(Math.random() * (openhours.length-1))];
			var closesAt 		= closehours[Math.round(Math.random() * (closehours.length-1))];

			var club = {};

			club.name 			= name;
			club.address 		= faker.address.zipCode() +", "+ faker.address.streetAddress();
			club.maxNumberOfPeople 	= maxNumberOfPeople;
			club.currentNumberOfPeople = currentNumberOfPeople;
			club.openingAt 		= opensAt;
			club.closingAt 		= closesAt;
			club.videoFileFolder 	= "clubs/"+firstname+lastname+"/video/";
			club.playListID 		= faker.random.number();


		//	save data to db
			var clubinsert = new clubmodel( club );
			clubinsert.save(function (err, clubinsert) {
		  		if (err) return console.error(err);
			});

	}


});

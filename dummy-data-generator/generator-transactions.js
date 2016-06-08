var faker 			= require("faker");
var randomstring 		= require("randomstring");
var mongoose 		= require('mongoose');


console.log("generator-transactions.js");


mongoose.connect('mongodb://localhost/atbusphere');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	console.log("mongodb connection established :)")

	//	prepare transactionschema and -model
	//
		var transactionSchema = mongoose.Schema({
	    		userID: String,					// ID of the user paying
			date: Date,						// date at which the transaction was opened
			latestPossibleDate: Date,			// latest date at which the transaction should be completed
			status: String,					// "open", "paid", "waiting"
			purpose: String,					// "Caipirinha", "Long Island Iced Tea", ...
			amount: Number,					// 7.5 (€)
			receiverID: String				// ID of the club for example, empty if we are the receiver
		});
		var transactionmodel = mongoose.model('transactions', transactionSchema);



	//	load all clubs
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
		var clubs = [];
		clubmodel.find(function (err, allclubs) {
	  		if (err) return console.error(err);
			console.log(allclubs);
			clubs = allclubs;
		});

		console.log(clubs);


	//	load all users and create 1 transaction for each one
	//
		var userSchema = mongoose.Schema({
	    		name: String,
			birthday: Date,
			address: String,
			email: String,
			image: String,
			paymentmethod: String,
			paymentauth: String
		});
		var usermodel = mongoose.model('users', userSchema);

		usermodel.find(function (err, users) {
	  		if (err) return console.error(err);

			users.forEach(function(user){

				//	generate transactiondata
					var receiverID 		= clubs[Math.round(Math.random() * (clubs.length-1))];
					receiverID 			= receiverID._id;
					var userID 			= user._id;

					var purpose 		= [ "Caipirinha", "Long Island Iced Tea", "Döner Kebab", "VIP Ticket", "Vodka Cola", "Vodka Orange", "Bacardi Cola", "Coca Cola", "Water", "Sprite", "Swimming Pool" ];
					var amount			= [ 6.50, 7.50, 4.50, 100.00, 4.00, 4.00, 6.00, 3.50, 2.50, 3.50, 7.00 ];
					var purposeNumber 	= Math.round(Math.random() * (purpose.length-1))

					var statuses 		= [ "open", "paid", "waiting" ];
					var status 			= statuses[Math.round(Math.random() * (statuses.length-1))];
					var date 			= new Date();
					var latestPossibleDate 	= new Date(+new Date + 12096e5);		// 12096e5 = 2 weeks in seconds

					var transaction = {};

					transaction.userID 		= userID;
					transaction.receiverID 		= receiverID;
					transaction.purpose 		= purpose[purposeNumber];
					transaction.amount 		= amount[purposeNumber];
					transaction.status 		= status;
					transaction.date 			= date;
					transaction.latestPossibleDate= latestPossibleDate;


				//	save data to db
					var transactioninsert = new transactionmodel( transaction );
					transactioninsert.save(function (err, transactioninsert) {
				  		if (err) return console.error(err);
					});

			});

		});


});

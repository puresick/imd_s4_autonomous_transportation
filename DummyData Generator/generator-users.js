var numberOfUsers 	= process.argv[2];

if(numberOfUsers === undefined) numberOfUsers = 1;

var faker 			= require("faker");
var randomstring 		= require("randomstring");
var mongoose 		= require('mongoose');


console.log("generator-users.js");
if( numberOfUsers != 1 )
	console.log("now creating " + numberOfUsers + " dummy users");
else
	console.log("now creating " + numberOfUsers + " dummy user");



mongoose.connect('mongodb://localhost/atbusphere');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	console.log("mongodb connection established :)")
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

	for(var i = 0; i < numberOfUsers; i++){

		//	generate userdata
			var paymentmethods 	= [ "PayPal", "MasterCard", "EuroCard", "Xtra Debit", "Bankeinzug" ];
			var emailprovider 	= [ "gmail.com", "gmx.de", "gmx.net", "googlemail.com", "web.de", "ard.tv" ];
			var firstname 		= faker.name.firstName();
			var lastname		= faker.name.lastName();
			var name 			= firstname + " " + lastname;

			var user = {};

			user.name 			= name;
			user.birthday 		= faker.date.between(new Date("1989-01-01"),new Date("1997-01-01"));
			user.address 		= faker.address.zipCode() + ", " + faker.address.streetAddress();
			user.email 			= firstname.toLowerCase()+lastname.toLowerCase() +"@"+emailprovider[Math.round(Math.random() * (emailprovider.length-1))];
			user.image 			= "users/images/"+name + faker.random.number() + ".png";
			user.paymentmethod 	= paymentmethods[Math.round(Math.random() * (paymentmethods.length-1))];
			user.paymentauth		= randomstring.generate();


		//	save data to db
			var userinsert = new usermodel( user );
			userinsert.save(function (err, userinsert) {
		  		if (err) return console.error(err);
			});

	}


});

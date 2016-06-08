var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var settings = require('./settings/readerSettings.json');

var demo = require('./settings/demoSettings.json');

var dbUrl = settings.mongo.url + settings.mongo.db;

function paymentDemo(paymentName, paymentValue, connectedDb) {
  console.log('Connecting to ' + paymentName + ' Payment API');
  setTimeout(function() {
    console.log('Connected to ' + paymentName + ' authentication server');
  }, 2000);
  setTimeout(function() {
    console.log('Authentication successful!');
  }, 4000);
  setTimeout(function() {
    console.log('Sending payment request of ' + paymentValue + '€');
  }, 6000);
  setTimeout(function() {
    console.log('Payment of ' + paymentValue + '€ successful!');
    connectedDb.close();
  }, 8000);
};

MongoClient.connect(dbUrl, function(error, db) {
  (error) ? console.error(error) : console.log('MongoDB connection established');;

  var userCollection = db.collection('users');
  var clubCollection = db.collections('clubs');

  var searchId = new ObjectID(demo.demo.userId);

  userCollection.find({_id: searchId}).toArray(function(error, items) {
    (error) ? console.log(error) : null;

    if (items === undefined || items.length === 0) {
      console.error('No valid customer');
      db.close();
    } else if (settings.type === 'payment') {
      switch (items[0].paymentmethod) {
        case "EuroCard":
          paymentDemo(items[0].paymentmethod, demo.demo.cashValue, db);
          break;
        case "PayPal":
          paymentDemo(items[0].paymentmethod, demo.demo.cashValue, db);
          break;
        case "Mastercard":
          paymentDemo(items[0].paymentmethod, demo.demo.cashValue, db);
          break;
        default:
          console.log('no payment');
          break;
      };
    } else if (settings.type === 'door') {
      //checking if id available, if true, granting user access
      if (items[0]._id) {
        //put code here to open door, for demo to simulate door opening
        console.log('user access granted')
      };
    };
  });
});

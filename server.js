var PORT = process.env.PORT || 8080
var express = require('express')
var app = express()
var path = require('path')
var static_path = path.join(__dirname, '/dist')

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var settings = require('./settings/readerSettings.json');
var nfc = require('MFRC522-node');
var demo = require('./settings/demoSettings.json');
var lastUserId = null;

var dbUrl = settings.mongo.url + settings.mongo.db;

var status = null;

function paymentDemo(user, paymentValue, connectedDb) {
  console.log('Connecting to ' + user.paymentmethod + ' Payment API');
  setTimeout(function() {
    console.log('Connected to ' + user.paymentmethod + ' authentication server');
  }, 2000);
  setTimeout(function() {
    console.log('Authentication successful!');
  }, 3400);
  setTimeout(function() {
    console.log('Sending payment request of ' + paymentValue + '€');
    console.log('from: ' + user.name);
    console.log('to: ' + settings.location.name);
  }, 5800);
  setTimeout(function() {
    console.log('Payment of ' + paymentValue + '€ successful!');
    connectedDb.close();
  }, 7000);
};

setInterval(function() {
  lastUserId = null;
}, 5000);

var nfcReaderCallback = function() {
  this.onUid = function(nfcId) {
    if (lastUserId == null) {
      //uncomment for usage with nfc reader - comment the next line
      lastUserId = nfcId;
      //lastUserId = demo.demo.userId;

      MongoClient.connect(dbUrl, function(error, db) {
        (error) ? console.error(error) : console.log('MongoDB connection established');

        var userCollection = db.collection('users');
        var clubCollection = db.collections('clubs');

        //var searchId = new ObjectID(lastUserId);
	var searchId = lastUserId;

        //uncomment for usage with nfc reader - comment the next line
       	userCollection.find({taguid: searchId}).toArray(function(error, items) {
        //userCollection.find({_id: searchId}).toArray(function(error, items) {
          (error) ? console.log(error) : null;

          if (items === undefined || items.length === 0) {
            console.error('No valid customer');
            db.close();
          } else if (process.env.MODE === 'payment') {
          //} else if (settings.type === 'payment') {
		console.log(items[0].paymentmethod);
            switch (items[0].paymentmethod) {
              case "EuroCard":
                paymentDemo(items[0], demo.demo.cashValue, db);
                status = 'payment';
                break;
              case "PayPal":
                paymentDemo(items[0], demo.demo.cashValue, db);
                status = 'payment';
                break;
              case "MasterCard":
                paymentDemo(items[0], demo.demo.cashValue, db);
                status = 'payment';
                break;
              default:
                console.log('no payment');
                status = 'error';
                db.close();
                break;
            };

          } else if (process.env.MODE === 'door') {
          //} else if (settings.type === 'door') {
            //checking if id available, if true, granting user access
            if (items[0]._id) {
              //put code here to open door, for demo to simulate door opening
              
              status = 'door';
              console.log('user access granted')
              db.close();
            };
          } else {
            console.log('invalid demo option - use \'door\' or \'payment\'');
            status = 'error';
            db.close();
          };
        });
      });
    };
  }
  this.onStart = function(){}
  this.onExit = function(){}
};

nfc.start(new nfcReaderCallback());


app.use(express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendFile(__dirname + '/dist/index.html')
})

app.get('/ajax', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //nfcReaderCallback();

  res.send(status);
  status = null;
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT, static_path)
})

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dbUrl = 'mongodb://localhost:27017/atbusphere';

MongoClient.connect(dbUrl, function(error, db) {
  console.log('MongoDB connection established');
  var userCollection = db.collection('users');
  var searchId = new ObjectID(process.argv[2]);

  userCollection.find({_id: searchId}).toArray(function(error, items) {
    console.log(items);
    db.close();
  });
});

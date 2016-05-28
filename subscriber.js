var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://139.59.144.75');

var subscriptionTopic = process.argv[2];

client.on('connect', function() {
  console.log('Connection established');
  console.log('Subscribed topic :' + subscriptionTopic); 

  client.subscribe(subscriptionTopic);
});

client.on('message', function(topic, message) {
  console.log(topic + ': ' + message);
});

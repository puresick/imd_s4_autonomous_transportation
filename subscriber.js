var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://139.59.144.75');

client.on('connect', function() {
  client.subscribe('test');
});

client.on('message', function(topic, message) {
  console.log(topic + ': ' + message);
});

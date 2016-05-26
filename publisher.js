var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://139.59.144.75');

client.on('connect', function() {
  client.publish('test', process.argv[2]);
  client.end();
});

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://139.59.144.75');

var publishingDuration = parseFloat(process.argv[2]);
var publishingInterval = parseFloat(process.argv[3]);
var publishingTopic = process.argv[4];
var publishingMessage = process.argv[5];

client.on('connect', function() {
  console.log('Connection established');
  console.log('Publishing Duration: ' + publishingDuration);
  console.log('Publishing Interval: ' + publishingInterval);
  console.log('Topic: ' + publishingTopic);
  console.log('Message: ' + publishingMessage);
  
  var intervalPublishing = setInterval(function() {
    console.log('published');
    client.publish(publishingTopic, publishingMessage);
  }, publishingInterval); 

  setTimeout(function() {
    clearInterval(intervalPublishing);
    client.end();
  }, publishingDuration + publishingInterval);
});

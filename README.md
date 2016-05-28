# imd_s4_autonomous_transportation

## How to run

###Publisher

`node publisher.js [DURATION] [INTERVAL] [TOPIC] [MESSAGE]`

__[DURATION] *in milliseconds*__
The duration of how long the publisher is sending out messages.

__[INTERVAL] *in milliseconds*__
The interval in which the messages are being send.

__[TOPIC] *as string*__
The mqtt topic the publisher is sending to.

__[MESSAGE] *as string*__
The message being send to the specified topic.


###Subscriber

`node subscriber.js [TOPIC]`

__[TOPIC] *as string*__
The topic the subscriber is listening to.


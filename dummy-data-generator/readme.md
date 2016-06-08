# dummydatagenerator

## prerequisites

	$ npm install

You also need to have a mongodb running on localhost with database atbusphere and collections "busses", "clubs" and "users".

## usage

### generator-users.js
as in the name, generates dummy users

	$ node generator-users.js [numberOfUsers]  

example:

	$ node generator-users.js 500


### generator-busses.js
as in the name, generates busses

	$ node generator-busses.js [numberOfBusses]  

example:

	$ node generator-busses.js 250


### generator-clubs.js
as in the name, generates clubs

	$ node generator-clubs.js [numberOfClubs]  

example:

	$ node generator-clubs.js 25



### generator-clubs.js
as in the name, generates clubs  
in contrast to all the other generators it does not need any arguments. it loads existing users and clubs and generates transactions between them.

	$ node generator-transactions.js

example:

	$ node generator-transactions.js

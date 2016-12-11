const app = require('./app');
const server = require('http').createServer(require('./app'));
const port = process.env.PORT || 3000;
const _db = require('./db').db;

var SYNC = false; 
// var SYNC = true; 

if (SYNC){
	_db.sync({force: true})
		.then(function(){
			server.listen(port, function(){
				console.log('listening on ' + port);
			});
		});
} else {
	server.listen(port, function(){
		console.log('listening on ' + port);
	});
}


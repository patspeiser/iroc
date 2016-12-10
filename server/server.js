const app = require('./app');
const server = require('http').createServer(require('./app'));
const port = process.env.PORT || 3000;

server.listen(port, function(){
	console.log('listening on ' + port);
});
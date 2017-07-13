const app = require('./app');
const server = require('http').createServer(require('./app'));
const port = process.env.PORT || 3000;
const _db = require('./db').db;
const io = require('socket.io')(server);
const Rekog = require('./js/rekog');
const rekog = new Rekog();
const Label = require('./db').models.Label;
const _ = require('lodash');

var SYNC = process.env.SYNC || false; 

//socket server event handling here
io.on('connection', function(socket){
	socket.on('s3UploadSuccess', function(payload){
		rekog.createRekogObject(payload)
		.then(function(rekogs){
			io.sockets.emit('rekogSuccess', rekogs);
			rekogs.Labels.forEach(function(label){
				var label = _.transform(label, function(result, val, key){
					result[key.toLowerCase()] = val;
				});
			Label.create({
				name: label.name,
				confidence: label.confidence,
				assetId: payload.id
			});
			});
		});
	});
});

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


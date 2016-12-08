const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function(req, res, next){
	console.log(req);
	res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app; 


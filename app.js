const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static('node_modules'));
app.use(express.static('browser'));
app.use(express.static('server'));

app.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname, '/server/views/index.html'));
});

module.exports = app; 


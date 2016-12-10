const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
module.exports = app; 

app.use(bodyParser.json());

app.use(express.static('./node_modules'));
app.use(express.static('./browser'));
app.use('/api', require('./routes'));

app.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname, 'views/index.html'));
});



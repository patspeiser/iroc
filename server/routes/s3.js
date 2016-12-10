const router = require('express').Router();
const Rekog = require('../js/rekog');
const rekog = new Rekog();
const Asset = require('../db').models.Asset;
const Bucket = require('../db').models.Bucket;

module.exports = router;

router.get('/', function(req, res, next){
	res.send('get /');
});

router.post('/', function(req, res, next){
	rekog.uploadToS3(req.body)
	.then(function(result){
		res.send(result);
	})
	.catch(next);
});



const router = require('express').Router();
const Rekog = require('../js/rekog');
const rekog = new Rekog();

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



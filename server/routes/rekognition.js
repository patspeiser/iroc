const router = require('express').Router();
const Rekog = require('../js/rekog');
const rekog = new Rekog();
module.exports = router;

router.get('/', function(req, res, next){
	res.send('get /');	
});

router.post('/', function(req, res, next){
	rekog.createRekogObject(req.body)
	.then(function(rekogs){
		res.send(rekogs);
	})
	.catch(next);
});

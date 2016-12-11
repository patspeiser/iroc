const router = require('express').Router();
const Asset = require('../db').models.Asset;
const Label = require('../db').models.Label;

module.exports = router;

router.get('/', function(req, res, next){
	Label.findAll()
	.then(function(labels){
		res.send(labels);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	Label.findById(req.params.id)
	.then(function(label){
		res.send(label);
	})
	.catch(next);
});

router.get('/:id/assets', function(req, res, next){
	Label.findById(req.params.id, {
		include: [Asset]
	})
	.then(function(labelAssets){
		res.send(labelAssets);
	})
	.catch(next);
});

router.get('/all/assets', function(req, res, next){
	Label.findAll({ include: [Asset]})
	.then(function(labelsAssets){
		res.send(labelsAssets);
	})
	.catch(next);
});
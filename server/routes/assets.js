const router = require('express').Router();
const Asset = require('../db').models.Asset;
const Label = require('../db').models.Label;

module.exports = router;

router.get('/', function(req, res, next){
	Asset.findAll()
	.then(function(assets){
		res.send(assets);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	Asset.findById(req.params.id)
	.then(function(asset){
		res.send(asset);
	})
	.catch(next);
});

router.get('/:id/labels', function(req, res, next){
	Asset.findById(req.params.id, {
		include: [Label]
	})
	.then(function(assetLabels){
		res.send(assetLabels);
	})
	.catch(next);
});

router.get('/all/labels', function(req, res, next){
	Asset.findAll({ include: [Label]})
	.then(function(assetsLabels){
		res.send(assetsLabels);
	})
	.catch(next);
});
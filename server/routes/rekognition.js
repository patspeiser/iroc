const router = require('express').Router();
const Rekog = require('../js/rekog');
const rekog = new Rekog();
const Label = require('../db').models.Label;
const Asset = require('../db').models.Asset;
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = router;

router.get('/', function(req, res, next){
	res.send('get /');	
});

router.post('/:assetId', function(req, res, next){
	rekog.createRekogObject(req.body)
	.then(function(rekogs){
			rekogs.Labels.forEach(function(label){
			var label = _.transform(label, function(result, val, key){
				result[key.toLowerCase()] = val
			});
			console.log(label);
			Label.create({
				name: label.name,
				confidence: label.confidence,
				assetId: req.params.assetId
			});
		});
		res.send(rekogs);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	Asset.findById(req.params.id, {
		include: [Label]
	})
	.then(function(asset){
		res.send(asset);
	})
	.catch(next);
});


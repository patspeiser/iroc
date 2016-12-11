const router = require('express').Router();
const Asset = require('../db').models.Asset;
const Label = require('../db').models.Label;
const Bucket = require('../db').models.Bucket;

module.exports = router;

router.get('/', function(req, res, next){
	Bucket.findAll()
	.then(function(buckets){
		res.send(buckets);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	Bucket.findById(req.params.id)
	.then(function(bucket){
		res.send(bucket);
	})
	.catch(next);
});

router.get('/:id/assets', function(req, res, next){
	Bucket.findById(req.params.id, {
		include: [Asset]
	})
	.then(function(bucketAssets){
		res.send(bucketAssets)
	})
	.catch(next);
});

router.get('/:id/assets/labels', function(req, res, next){
	Bucket.findById(req.params.id, {
		include: [{
			model: Asset,
			include: [Label]
		}]
	})
	.then(function(bucketsAssetsLabels){
		res.send(bucketsAssetsLabels);
	})
	.catch(next);
});
router.get('/all/assets', function(req, res, next){
	Bucket.findAll({ include: [Asset]})
	.then(function(bucketsAssets){
		res.send(bucketsAssets);
	})
	.catch(next);
});

router.get('/all/assets/labels', function(req, res, next){
	Bucket.findAll({
		include: [{
			model: Asset,
			include: [Label]
		}]
	})
	.then(function(bucketsAssetsLabels){
		res.send(bucketsAssetsLabels);
	})
	.catch(next);
});


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
		Bucket.findOrCreate({
			where: {
				name: req.body.bucket
			}
		})
		.then(function(bucket){
			Asset.create({
				name: result.name, 
				image: result.image, 
				awsId: result.awsId, 
				bucketId: bucket[0].id
			})
			.then(function(asset){
				res.send(asset);
			});
		});
	})
	.catch(next);
});



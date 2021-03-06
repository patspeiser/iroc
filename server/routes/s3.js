const router = require('express').Router();
const Rekog = require('../js/rekog');
const rekog = new Rekog();
const Asset = require('../db').models.Asset;
const Bucket = require('../db').models.Bucket;
const socket = require('socket.io-client')(process.env.SOCKET_SERVER || 'http://localhost:' + process.env.PORT);
const server = require('../server');

module.exports = router;

router.get('/', function(req, res, next){
	res.send('get /');
});

router.get('/:bucketName/contents', function(req, res, next){
	rekog.getBucketContents(req.params.bucketName)
		.then(function(contents){
			res.send(contents);
		})
		.catch(next);
});

router.post('/', function(req, res, next){
	rekog.uploadToS3(req.body)
	.then(function(result){
		console.log(result)
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
				console.log('success... emitting signal');
				socket.emit('s3UploadSuccess', asset);
				console.log('DID EMIT');
				res.send(asset);
			});
		});
	})
	.catch(function(){
		next
	});
});



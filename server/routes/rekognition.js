const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const uuid = require('node-uuid');
const rekognition = new AWS.Rekognition();
const router = require('express').Router();
var Promise = require('bluebird');
module.exports = router;

//specify version so it doesn't get fckd up and try to pick on its own
AWS.config.apiVersions = {
  rekognition: '2016-06-27',
};

//new s3 instance
// const s3 = new AWS.S3();

//my bucket
var bucketName = 'rekog-assets';

var createRekogObject = function(asset){
	var params = {
		Image: {
			S3Object: {
				Bucket: asset.bucket,
				Name: asset.image
			}
		},
		MaxLabels: asset.maxLabels || 100,
	};
	return new Promise(function(resolve, reject) {
		rekognition.detectLabels(params, function(err, data){
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

router.get('/', function(req, res, next){
	res.send('get /');	
});

router.post('/', function(req, res, next){
	createRekogObject(req.body)
	.then(function(rekogs){
		res.send(rekogs);
	})
	.catch(next);
});

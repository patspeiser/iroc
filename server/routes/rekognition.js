const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const uuid = require('node-uuid');
const rekognition = new AWS.Rekognition();
const router = require('express').Router();
module.exports = router;

//specify version so it doesn't get fckd up and try to pick on its own
AWS.config.apiVersions = {
  rekognition: '2016-06-27',
};

//new s3 instance
const s3 = new AWS.S3();

//my bucket
var bucketName = 'rekog-assets';

//TODO: wrap this in a promise so I can .then() off of it
var createRekogObject = function(asset, bucket, maxLabels){
	var params = {
		Image: {
			S3Object: {
				Bucket: bucket,
				Name: 'horses'
			}
		},
		MaxLabels: maxLabels,
	};
	return rekognition.detectLabels(params, function(err, data){
		if (err) console.log(err);
		else console.log(data);
	});
};

router.get('/', function(req, res, next){
	res.send('get /');	
});

router.post('/', function(req, res, next){
	console.log(req.body);
	createRekogObject(req.body.asset, req.body.bucket, req.body.maxLabels);
	res.send('success');
});

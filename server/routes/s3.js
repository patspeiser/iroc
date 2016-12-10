const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const fs = require('fs');
const s3 = new AWS.S3();
AWS.config.update({region: 'us-east-1'});
const Promise = require('bluebird');
const router = require('express').Router();
const request = require('request');
const chalk = require('chalk');

module.exports = router;

//specify version so it doesn't get fckd up and try to pick on its own
AWS.config.apiVersions = {
	rekognition: '2016-06-27',
};

//////
// TODO: add stuff here to check if bucket exists first
// instead of relying on it to check on its own
/////

var uploadToS3 = function(asset){
	console.log(chalk.blue('REQUEST'), asset);

	//returns a promise
	return new Promise(function(resolve, reject){
		//fetches image from req.body.url and converts to buffer
		request({
			url: asset.url,
			encoding: null
		}, function(err, res, body) {
			//once i've got the buffer (body) i can send to s3
			if (err)
				console.log(err);

			//TODO: add check for image size. must be <5mb

			//create bucket
			s3.createBucket({Bucket: asset.bucket}, function(){
				//what we're gonna upload to bucket
				var params = {
					Bucket: asset.bucket, 
					Key: asset.name,
					Body: body
				};
				//upload to bucket
				s3.putObject(params, function(err, data) {
					if (err)
						reject(err, err);
					else
						//this is what is returned if the request is successful
						resolve({
							file: asset.url,
							fileName: asset.name,
							bucket: asset.bucket,
							s3Id: data.ETag
						});
				});
			});
		});
	});
};

// uploadToS3();

router.get('/', function(req, res, next){
	res.send('get /');
});

router.post('/', function(req, res, next){
	uploadToS3(req.body)
	.then(function(result){
		console.log(chalk.green('RESULT'),result);
		res.send(result);
	})
	.catch(next);
});


